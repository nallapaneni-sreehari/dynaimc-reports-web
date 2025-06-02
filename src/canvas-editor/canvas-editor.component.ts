import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as fabric from 'fabric';

@Component({
  selector: 'app-canvas-editor',
  templateUrl: './canvas-editor.component.html',
  styleUrls: ['./canvas-editor.component.css'],
})
export class CanvasEditorComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false })
  canvasElement!: ElementRef<HTMLCanvasElement>;
  canvas!: fabric.Canvas;
  draggedElementType: string | null = null;
  zoomLevel = 100;
  xAxis: number[] = [];
  yAxis: number[] = [];
  canvaScale = 1;
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event:any) {
    console.debug("Scroll Event", event);
    this.canvaScale+=0.1;
  }
  ngAfterViewInit(): void {
    this.initializeCanvas();
    this.generateAxis();
  }

  initializeCanvas() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      width: 760,
      height: 560,
      backgroundColor: '#ffffff',
    });
  }
  zoomIn() {
    // this.zoomLevel += 10;
    // this.canvas.setZoom(this.zoomLevel / 100);
    this.canvaScale += 0.1;
  }

  zoomOut() {
    // this.zoomLevel -= 10;
    // this.canvas.setZoom(this.zoomLevel / 100);
    this.canvaScale -= 0.1;
  }
  generateAxis() {
    this.xAxis = Array.from({ length: 20 }, (_, i) => i * 50);
    this.yAxis = Array.from({ length: 12 }, (_, i) => i * 50);
  }
  onDragStart(event: DragEvent, type: string) {
    this.draggedElementType = type;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Allow the drop
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    if (!this.draggedElementType) return;

    const rect = this.canvasElement.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / this.canvas.getZoom();
    const y = (event.clientY - rect.top) / this.canvas.getZoom();

    switch (this.draggedElementType) {
      case 'text':
        this.addText(x, y);
        break;
      case 'rectangle':
        this.addRectangle(x, y);
        break;
      case 'date':
        this.addDate(x, y);
        break;
      case 'table':
        this.addTable(x, y);
        break;
      case 'logo':
        this.addLogo(x, y);
        break;
    }

    this.draggedElementType = null; // Reset the dragged element type
  }

  addText(left: number, top: number) {
    const text = new fabric.Textbox('New Text', {
      left,
      top,
      fontSize: 16,
      editable: true,
    });
    this.canvas.add(text);
  }

  addRectangle(left: number, top: number) {
    const rect = new fabric.Rect({
      left,
      top,
      fill: 'blue',
      width: 100,
      height: 50,
    });
    this.canvas.add(rect);
  }

  addDate(left: number, top: number) {
    const date = new fabric.Textbox(new Date().toLocaleDateString(), {
      left,
      top,
      fontSize: 14,
      fontStyle: 'italic',
      editable: false,
    });
    this.canvas.add(date);
  }

  addTable(left: number, top: number) {
    const table = new fabric.Textbox('Table\nRow 1\nRow 2\nRow 3', {
      left,
      top,
      fontSize: 14,
      width: 200,
      height: 100,
      backgroundColor: '#f9f9f9',
      borderColor: '#000',
      borderWidth: 1,
    });
    this.canvas.add(table);
  }

  addLogo(left: number, top: number) {
    fabric.FabricImage.fromURL(
      'https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fdog-png&psig=AOvVaw2XgmsGJCcvleXrvGlOTNDp&ust=1737177608132000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDnt4qB_IoDFQAAAAAdAAAAABAE',
      {},
      (img: any) => {
        img.set({
          left,
          top,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        this.canvas.add(img);
      }
    );
  }

  deleteSelected() {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      this.canvas.remove(activeObject);
    }
  }
}
