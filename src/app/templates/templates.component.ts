import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../../services/login.service';
import { DialogModule } from 'primeng/dialog';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css'
})
export class TemplatesComponent {
  showDialog: boolean = true;

  embedUrl: any = '';
  nextcloudUrl = environment.host;
  
  redirectNextcloudFile = (fileId: any) => {
    return `${environment.host}/index.php/apps/files/files/${fileId}?dir=/&openfile=true`
  };

  constructor(private sanitizer: DomSanitizer) {

  }


  public config = {
    document: {
      fileType: "docx",
      key: "Khirz6zTPdfd7",
      title: "Example Document Title.docx",
      url: "https://calibre-ebook.com/downloads/demos/demo.docx",
    },
    documentType: "word",
    editorConfig: {
      callbackUrl: "https://example.com/url-to-callback.ashx",
    },
  };

  ngOnInit(): void {
    // Directly open the template file if user selected edit template from reports page
    const getTemplateToOpen: any = localStorage.getItem('openTemplate');
    const fileId = JSON.parse(getTemplateToOpen ?? '')?.fileId;
    console.info(`fileId ::: `, fileId);
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.nextcloudUrl);
    if (fileId) {
      const templateUrl = this.redirectNextcloudFile(fileId);
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(templateUrl);
    }
    console.info(`embedUrl :: `, this.embedUrl);
  }

  @ViewChild('nextcloudFrame') iframe!: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit() {
    const iframeEl = this.iframe?.nativeElement;

    if (iframeEl) {
      // Send a message to iframe after it loads
      iframeEl.onload = () => {
        // Replace '*' with the actual Nextcloud origin for security
        iframeEl?.contentWindow?.postMessage({
          action: 'hideUIElements',
          elements: ['header', 'leftpanel'],              // example IDs
          classNames: ['app-navigation', 'files-navigation', '#header-menu contactsmenu', '#header-menu unified-search-menu']  // the classes to hide
        }, environment.host);
      };

      // Listen to messages from iframe
      window?.addEventListener('message', (event) => {
        if (event?.origin !== environment.host) {
          // Ignore messages from unknown origins
          return;
        }
        console.log('Message received from iframe:', event.data);
        // Handle messages here...
      });
    }
  }

  ngOnDestroy() {
    this.embedUrl = '';
    localStorage.setItem('openTemplate', 'null');
  }
}
