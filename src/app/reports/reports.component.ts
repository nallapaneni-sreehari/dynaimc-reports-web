import { Component, ElementRef, inject, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { TabViewModule } from 'primeng/tabview';
import { TextareaModule } from 'primeng/textarea';
import { TemplateService } from '../../services/templates.service';
import { renderAsync } from 'docx-preview';
import { SplitterModule } from 'primeng/splitter';
import { ReportService } from '../../services/reports.service';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import { DomSanitizer } from '@angular/platform-browser';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { environment } from '../../environments/environment';
import { ToastService } from '../../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ModuleRegistry,
  colorSchemeDarkBlue,
  colorSchemeDarkWarm,
  colorSchemeLightCold,
  colorSchemeLightWarm,
  themeQuartz,
} from "ag-grid-community";
import { AgCellRendererComponent } from './ag-cell-renderer/ag-cell-renderer.component';
import { ToggleButton } from 'primeng/togglebutton';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule, ButtonModule, DialogModule, DropdownModule, FileUploadModule, TabViewModule, TextareaModule, SplitterModule, JsonEditorComponent, ReactiveFormsModule, ToggleButton, NgxExtendedPdfViewerModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  previewChecked: boolean = false;
  templatesData: any;
  iFrameUrl: any;
  isTemplatesLoading: any;
  editorOptions: any;
  @ViewChild('jsonEditor') editor: JsonEditorComponent | undefined;
  jsonDataModified: any;
  fb: FormBuilder = new FormBuilder();
  form: FormGroup;
  theme = themeQuartz.withPart(colorSchemeLightWarm);
  isDarkMode = false;
  originalFilePreview: string = '';

  constructor(
    private templateService: TemplateService,
    private reportService: ReportService,
    private sanitize: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['text', 'tree', 'view'];
    this.editorOptions.mode = 'text';
    this.editorOptions.onModeChange = (newMode: string, oldMode: string) => {
      if (newMode === 'tree') {
        setTimeout(() => {
          this.editor?.expandAll();
        }, 100); // small delay ensures editor is fully in tree mode
      }
    };
    this.form = this.fb.group({
      jsonData: [this.jsonData]
    });

    this.reportService?.themeChange?.subscribe((theme) => {
      if (theme === "dark") {
        this.theme = themeQuartz.withPart(colorSchemeDarkBlue);
      } else {
        this.theme = themeQuartz.withPart(colorSchemeLightWarm);
      }
      this.isDarkMode = theme === 'dark';
    })
  }

  filteredReports: any = [];
  selectedTabIndex = 0; // 0: All, 1: Completed, 2: Failed
  jsonData: any = [{
    "customer_name": "Amit Verma",
    "item": [
      {
        "date": "2025-06-01",
        "mode": "UPI",
        "part": "Salary",
        "depo": "50,000",
        "withdrawals": "",
        "bal": "50,000"
      },
      {
        "date": "2025-06-03",
        "mode": "ATM",
        "part": "Cash Withdrawal",
        "depo": "",
        "withdrawals": "5,000",
        "bal": "45,000"
      },
      {
        "date": "2025-06-05",
        "mode": "Bank Transfer",
        "part": "Rent",
        "depo": "",
        "withdrawals": "15,000",
        "bal": "30,000"
      }
    ]
  }];

  screenWidth = window.innerWidth;
  splitOrientation: 'horizontal' | 'vertical' = this.screenWidth < 768 ? 'vertical' : 'horizontal';

  reports = [
    {
      name: 'Client Invoice Jan',
      status: 'Completed',
      generatedOn: '2025-06-01',
      fileSize: '320 KB',
      download: '/reports/download/invoice_jan.pdf'
    },
    {
      name: 'Q2 Sales Report',
      status: 'Failed',
      generatedOn: '2025-05-28',
      fileSize: 'N/A',
      download: ''
    },
    {
      name: 'User Signup Analysis',
      status: 'Completed',
      generatedOn: '2025-05-15',
      fileSize: '512 KB',
      download: '/reports/download/signup_analysis.pdf'
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  columnDefs: ColDef[] = [
    { headerName: 'Report Name', field: 'name', flex: 1 },
    { headerName: 'Status', field: 'status', flex: 1 },
    { headerName: 'Generated On', field: 'generatedOn', flex: 1 },
    { headerName: 'File Size', field: 'fileSize', flex: 1 },
    {
      headerName: 'Download',
      field: 'download',
      cellRenderer: AgCellRendererComponent,
      cellRendererParams: ()=>{
        return {
          type: 'download',
          label: 'Download'
        }
      },
      flex: 1
    }
  ];

  statusOptions = [
    { label: 'All', value: null },
    { label: 'Completed', value: 'Completed' },
    { label: 'Failed', value: 'Failed' }
  ];

  selectedStatus: string | null = null;
  selectedDate: Date | null = null;

  templateOptions = [];
  selectedTemplate: string | null = null;

  showGenerateDialog = false;

  showPreview = false;
  previewLoading = false;

  ngOnInit() {
    this.filteredReports = [...this.reports];
    
    this.getUserTemplates();

    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
      this.splitOrientation = this.screenWidth < 768 ? 'vertical' : 'horizontal';
    });
  }

  openGenerateDialog() {
    this.showGenerateDialog = true;
  }

  generateReport() {
    // Logic to call backend API to generate report
    console.log('Generating report with template:', this.selectedTemplate);
    // this.showGenerateDialog = false;

  }

  preview() {
    const template: any = this.templatesData?.filter((temp: any) => temp.name === this.selectedTemplate);
    console.info(`template :: `, template);
    // this.previewFile(template[0]?.downloadUrl);

    const user: any = localStorage.getItem('user');
    const email = JSON.parse(user)?.email;
    const fileUrl = `${template[0]?.downloadUrl}^${Date.now()}`; // add ^ to avoid caching and serving the old files from officeapps

    const encodedUrl = btoa(fileUrl); // Base64 encode
    const encodedUsername = encodeURIComponent(email); // Just URL encode
    const livePreview = environment?.apiUrl;

    const finalUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${livePreview}/api/v1/nextcloud/files/live/${encodedUrl}/${encodedUsername}`;

    this.originalFilePreview = finalUrl;
    this.iFrameUrl = this.sanitize.bypassSecurityTrustResourceUrl(finalUrl);
    this.showPreview = true;
    console.info(`iFrameUrl ::: `, this.iFrameUrl);
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    this.filterReports();
  }

  filterReports() {
    if (this.selectedTabIndex === 0) {
      this.filteredReports = [...this.reports]; // All
    } else if (this.selectedTabIndex === 1) {
      this.filteredReports = this.reports.filter(r => r.status === 'Completed');
    } else {
      this.filteredReports = this.reports.filter(r => r.status === 'Failed');
    }
  }
  handleCSVUpload(event: any) {
    console.info(`Event file csv :: `, event);
  }

  getUserTemplates() {
    this.isTemplatesLoading = true;
    const user: any = localStorage.getItem('user');
    const email = JSON.parse(user)?.email;
    console.info(`called ::`, email, user);
    if (email) {
      this.templateService.getUserTemplates(email).subscribe({
        next: (response: any) => {
          console.info(`Templates by user ::: `, response);
          const data = response?.data;
          this.templatesData = data;
          this.templateOptions = data?.filter((temp: any) => temp?.downloadUrl)
            .map((temp: any) => ({
              label: temp.name,
              value: temp.name
            }));
          this.isTemplatesLoading = false;
          console.info(`templateOptions :: `, this.templateOptions);
        }
      })
    }
  }

  @ViewChild('docxContainer', { static: false }) docxContainer!: ElementRef;
  async previewFile(url: string) {
    this.previewLoading = true;
    const user: any = localStorage.getItem('user');
    const email = JSON.parse(user)?.email;
    console.info(`url :: `, url, email);
    this.reportService.downloadTemplate({ url, username: email, password: email }, { responseType: 'arraybuffer' }).subscribe({
      next: async (arrayBuffer: ArrayBuffer) => {
        // Clear previous content
        this.docxContainer.nativeElement.innerHTML = '';

        if (this.selectedTemplate?.includes('.pdf')) {
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          console.info(`url :: `, url);
          const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement;
          iframe.src = url;
        }
        // Render docx
        await renderAsync(arrayBuffer, this.docxContainer.nativeElement, undefined, {
          className: 'docx',
          inWrapper: true
        });
        this.showPreview = true;
        this.previewLoading = false;
      }
    });
  }

  zoom: number = 1;

  zoomIn() {
    this.zoom = Math.min(this.zoom + 0.1, 3); // Max 300%
  }

  zoomOut() {
    this.zoom = Math.max(this.zoom - 0.1, 0.5); // Min 50%
  }

  resetZoom() {
    this.zoom = 1;
  }

  editTemplate() {
    const template: any = this.templatesData?.filter((temp: any) => temp.name === this.selectedTemplate);

    localStorage.setItem('openTemplate', JSON.stringify(template[0]));
    const newPage = environment.production ? '/reportsforge/templates' : '/templates';
    window.open(newPage, '_blank');
  }

  changeLog(event: any) {
    console.log('data :: ', JSON.stringify(event));
    this.jsonDataModified = JSON.parse(JSON.stringify(event));

  }

  generateAndDownload(type: string) {
    console.log('preview :: ', this.previewChecked);

    if (type === 'preview' && !this.previewChecked) {
      this.iFrameUrl = this.sanitize.bypassSecurityTrustResourceUrl(this.originalFilePreview);
      this.showSuccess({ msg: 'Success', details: 'Showing the original (template)' });
      return;
    }

    const template: any = this.templatesData?.find((temp: any) => temp.name === this.selectedTemplate);
    
    if (!template) {
      this.showError({ msg: 'Failed', details: 'Select a template to generate report' });
      return;
    }

    this.spinner.show();
    const user: any = localStorage.getItem('user');
    const username = JSON.parse(user)?.email;

    this.reportService.generateAndDownload(
      { downloadUrl: template?.downloadUrl, username, data: this.form?.value?.jsonData },
      { responseType: 'arraybuffer' }
    ).subscribe({
      next: (data: ArrayBuffer) => {
        // Detect file type (optional fallback to zip if unknown)
        const isMultiple = Array.isArray(this.jsonData) && this.jsonData.length > 1;
        const fileType = isMultiple ? 'application/zip' : 'application/pdf';
        const fileExt = isMultiple ? 'zip' : 'pdf';
        const filename = `report_${Date.now()}.${fileExt}`;

        const blob = new Blob([data], { type: fileType });
        const url = window.URL.createObjectURL(blob);

        if (type === 'preview') {
          if (this.previewChecked) {
            this.iFrameUrl = url;
            this.showSuccess({ msg: 'Success', details: 'Showing the preview' });
          }
          this.spinner.hide();
          return;
        }

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);

        this.showSuccess({ msg: 'Success', details: 'Report generated successfully' });
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Download failed:', err);
        this.showError({ msg: 'Failed', details: 'Report generation or download failed. Please try again.' });
        this.spinner.hide();
      }
    });
  }

  public toast = inject(ToastService);
  showSuccess({ msg, details }: any) {
    this.toast.success(msg, details);
  }
  showError({ msg, details }: any) {
    this.toast.error(msg, details);
  }

}
