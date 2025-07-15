import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const DocsAPI: any;

@Component({
  selector: 'app-onlyoffice-suit',
  imports: [],
  templateUrl: './onlyoffice-suit.component.html',
  styleUrl: './onlyoffice-suit.component.css'
})
export class OnlyofficeSuitComponent implements OnInit {

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

  }

  @ViewChild('nextcloudFrame') iframe!: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit() {
    const iframeEl = this.iframe.nativeElement;

    // Send a message to iframe after it loads
    iframeEl.onload = () => {
      // Replace '*' with the actual Nextcloud origin for security
      iframeEl.contentWindow?.postMessage({
        action: 'hideUIElements',
        elements: ['header', 'leftpanel'],              // example IDs
        classNames: ['app-navigation', 'files-navigation', '#header-menu contactsmenu', '#header-menu unified-search-menu']  // the classes to hide
      }, 'http://localhost');
    };

    // Listen to messages from iframe
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost') {
        // Ignore messages from unknown origins
        return;
      }
      console.log('Message received from iframe:', event.data);
      // Handle messages here...
    });
  }
}
