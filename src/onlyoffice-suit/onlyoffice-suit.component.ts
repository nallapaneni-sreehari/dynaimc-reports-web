import { Component, OnInit } from '@angular/core';
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

}
