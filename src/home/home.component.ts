import { Component } from '@angular/core';
import { DragDropComponent } from '../drag-drop/drag-drop.component';
import { CanvasEditorComponent } from "../canvas-editor/canvas-editor.component";

@Component({
  selector: 'app-home',
  imports: [DragDropComponent, CanvasEditorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
