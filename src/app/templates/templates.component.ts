import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../../services/login.service';
import { DialogModule } from 'primeng/dialog';
import { environment } from '../../environments/environment';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
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

  constructor(private sanitizer: DomSanitizer, private toast: ToastService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    // Directly open the template file if user selected edit template from reports page
    const getTemplateToOpen: any = localStorage.getItem('openTemplate');
    let fileId;
    try {
      fileId = JSON.parse(getTemplateToOpen ?? '')?.fileId;
    } catch (_err) {
      fileId = '';
    }
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
    this.spinner.show();
    const user: any = localStorage.getItem('user');
    const username = JSON.parse(user)?.email;

    const iframeEl = this.iframe?.nativeElement;

    if (!iframeEl) return;

    iframeEl.onload = () => {
      // ✅ Just send postMessage; let iframe handle polling
      iframeEl?.contentWindow?.postMessage({
        action: 'autofill',
        inputs: {
          'input[name="user"]': username,
          'input[type="password"]': username
        }
      }, environment.host);
    };

    window?.addEventListener('message', (event) => {
      if (event?.origin !== environment.host) return;

      if (event.data?.status === 'autofillComplete') {
        iframeEl?.contentWindow?.postMessage({
          action: 'hideUIElements',
          elements: ['header', 'leftpanel'],
          classNames: [
            'app-navigation',
            'files-navigation',
            '#header-menu contactsmenu',
            '#header-menu unified-search-menu'
          ]
        }, environment.host);
      }

      if (event.data?.status === 'elementsHidden') {
        console.log('✅ Iframe UI elements hidden.');
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy() {
    this.embedUrl = '';
    localStorage.setItem('openTemplate', 'null');
  }

  copied = false;
  copyToClipboard() {
    const user: any = localStorage.getItem('user');
    const email = JSON.parse(user)?.email;
    this.copied = true;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        console.log('Text copied to clipboard');
        // Optional: Show success toast/snackbar
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for older browsers
      this.fallbackCopyText(email);
    }
    // Reset icon after 1.5 seconds
    setTimeout(() => {
      this.copied = false;
    }, 1500);

    this.toast.success('Copied!', 'Email and password copied to clipboard');
  }

  fallbackCopyText(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Fallback: Text copied');
    } catch (err) {
      console.error('Fallback: Failed to copy', err);
    }
    document.body.removeChild(textarea);
  }
}
