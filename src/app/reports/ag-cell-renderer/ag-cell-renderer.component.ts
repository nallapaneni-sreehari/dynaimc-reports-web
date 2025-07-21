import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ButtonModule } from 'primeng/button';
import { ReportService } from '../../../services/reports.service';
import { Tooltip } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-ag-cell-renderer',
  imports: [ButtonModule, CommonModule, Tooltip, Dialog, NgxExtendedPdfViewerModule, ConfirmPopupModule,],
  providers: [ConfirmationService],
  templateUrl: './ag-cell-renderer.component.html',
  styleUrl: './ag-cell-renderer.component.css'
})
export class AgCellRendererComponent implements ICellRendererAngularComp {
  constructor(
    private rs: ReportService,
    private confirmationService: ConfirmationService,
  ) { }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  params: any = {};
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }

  downloadFile(type: string) {
    const params = { bucket: this.params?.data?.bucket, key: this.params?.data?.filename }
    this.rs.getSignedUrl(params).subscribe({
      next: (res: any) => {
        const a = document.createElement('a');
        if (type === 'preview') {
          if (res?.data?.includes('minio')) { res.data = res?.data?.replace('minio', 'reportsforge'); }
          this.rs.showFilePreviewBS.next({ show: true, url: res?.data, filename: this.params?.data?.filename });
          return;
        }
        a.href = res.data;
        a.download = this.params?.data?.filename; // or custom name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (err) => {
        console.error('Download error:', err);
      }
    });
  }

  deleteFile(event: any) {
    console.log('Delete file');
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'File will be permenently deleted ?',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Yes',
        severity: 'danger'
      },
      accept: () => {
        this.showSuccess({msg: 'Success', details: `${this.params?.data?.filename} is deleted`})
      },
      reject: () => {
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
