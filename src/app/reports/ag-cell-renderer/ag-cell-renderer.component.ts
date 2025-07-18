import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ag-cell-renderer',
  imports: [ButtonModule, CommonModule],
  templateUrl: './ag-cell-renderer.component.html',
  styleUrl: './ag-cell-renderer.component.css'
})
export class AgCellRendererComponent implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  params: any = {};
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }

  downloadFile(){
    console.log('downloading :: ', this.params);
  }
}
