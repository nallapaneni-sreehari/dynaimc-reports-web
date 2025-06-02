import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgxDragResizeModule, NgxResizeHandleType } from 'ngx-drag-resize';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NgxMoveableComponent, NgxMoveableModule } from 'ngx-moveable';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css',
  imports: [
    CdkDropList,
    CdkDrag,
    CommonModule,
    NgxDragResizeModule,
    NgIconComponent,
    NgxMoveableModule,
  ],
  providers: [provideIcons({ heroTrash })],
})
export class DragDropComponent {
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  todo = [
    { id: 1, name: 'Text Box', type: 'textbox' },
    { id: 2, name: 'Table', type: 'table' },
    { id: 3, name: 'Date Field', type: 'date' },
    { id: 4, name: 'Signature', type: 'signature' },
    { id: 5, name: 'Logo', type: 'logo' },
  ];

  // List of widgets that have been dropped into the "Done" (invoice layout)
  done: any = [];

  // Handle the drop event
  drop(event: CdkDragDrop<any[]>) {
    console.log(`EVENT :::: `, event);
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;

    if (previousContainer === currentContainer) {
      // If the item is dropped within the same list (dragged and dropped back)
      return;
    }

    // Move the item from "To Do" to "Done"
    const widget: any = event.item.data || { name: 'Test' };
    if (event.previousContainer !== event.container) {
      this.done.push(widget);
      // this.todo = this.todo.filter(item => item.id !== widget.id); // Remove from "To Do"
    } else {
      // If the item is dragged back to "To Do", do the reverse
      // this.todo.push(widget);
      this.done = this.done.filter((item: any) => item.id !== widget.id); // Remove from "Done"
    }
  }

  draggable: any = true;
  resizable: any = [];
  throttleDrag = 1;
  edgeDraggable: any = false;
  startDragRotate: any = 0;
  throttleDragRotate: any = 0;
  scalable: any = true;
  keepRatio: any = false;
  throttleScale: any = 0;
  snappable: any = true;
  bounds: any = { left: 35, top: 35, right: 35, bottom: 35, position: 'css' };
  @ViewChild('targetRef')
  targetRef!: ElementRef<HTMLDivElement>;
  @ViewChild('moveableRef')
  moveableRef!: NgxMoveableComponent;
  onResize(e: any) {
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = e.drag.transform;
  }
  onDrag(e: any) {
    e.target.style.transform = e.transform;
  }
  onScale(e: any) {
    console.log(`scaling ::: `, e);
    e.target.style.transform = e.drag.transform;
  }
  onBound(e: any) {
    console.log(e);
  }
}
