import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as fabric from 'fabric';
import { LOGO } from '../common/globals';

@Component({
  selector: 'app-report-editor',
  templateUrl: './report-editor.component.html',
  styleUrls: ['./report-editor.component.css'],
})
export class ReportEditorComponent implements AfterViewInit {
  @ViewChild('canvasWrapper', { static: false })
  canvasWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('canvasElement', { static: false })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  private canvas!: fabric.Canvas;
  private zoomLevel: number = 1; // Default zoom level
  private readonly A4_DIMENSIONS = { width: 2480, height: 3508 }; // A4 at 300 DPI (px)

  ngAfterViewInit(): void {
    // Initialize Fabric.js canvas
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      width: this.A4_DIMENSIONS.width / 4, // Scaled down for screen
      height: this.A4_DIMENSIONS.height / 4,
      backgroundColor: '#ffffff',
    });
  }

  // Add Text to Canvas
  addText(): void {
    const text = new fabric.Textbox('Edit Me', {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 16,
      editable: true,
    });
    this.canvas.add(text);
  }

  // Add Rectangle to Canvas
  addRectangle(): void {
    const rectangle = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'gray',
      width: 150,
      height: 100,
      borderColor: 'blue', // border color
      strokeWidth: 15, // border thickness
      rx: 5, // horizontal corner radius
      ry: 5, // vertical corner radius
    });
    this.canvas.add(rectangle);
  }

  addImage(): void {
    fabric.FabricImage.fromURL(
      LOGO,
      { crossOrigin: 'anonymous' },
      {
        left: 100,
        top: 100,
        scaleX: 0.1,
        scaleY: 0.2,
      }
    ).then((img) => {
      console.log('Image added to canvas:', img);
      this.canvas.add(img);
    });
  }

  // Zoom In
  zoomIn(): void {
    this.zoomLevel += 0.1;
    this.zoomCanvas();
  }

  // Zoom Out
  zoomOut(): void {
    if (this.zoomLevel > 0.1) {
      this.zoomLevel -= 0.1;
      this.zoomCanvas();
    }
  }

  exportToJson() {
    const json = this.canvas.toJSON();
    console.log(`JSON :: `, json);
  }
  
  // Zoom Canvas and Scale Elements
  private zoomCanvas(): void {
    this.canvas.setZoom(this.zoomLevel);
    this.canvas.setWidth((this.A4_DIMENSIONS.width / 4) * this.zoomLevel);
    this.canvas.setHeight((this.A4_DIMENSIONS.height / 4) * this.zoomLevel);
    this.canvas.requestRenderAll();
  }
}
