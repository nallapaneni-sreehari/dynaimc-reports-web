import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastService } from '../../services/toast.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirmation-dilog',
  imports: [ConfirmDialog, ButtonModule],
  templateUrl: './confirmation-dilog.component.html',
  styleUrl: './confirmation-dilog.component.css',
  providers: [ConfirmationService]
})
export class ConfirmationDilogComponent {

  constructor(
    private confirmationService: ConfirmationService,
    private toast: ToastService
  ) {
    this.toast.showDialog.subscribe((body: { header: string, msg: string, data: any, handler: Function }) => {
      if (body) {
        const { header, msg, data, handler } = body ?? {};
        this.confirm(header, msg, data, handler);
      }
    })
  }

  showSuccess({ msg, details }: { msg: string, details: string }) {
    this.toast.success(msg, details);
  }
  showError({ msg, details }: { msg: string, details: string }) {
    this.toast.error(msg, details);
  }

  confirm(header: string, message: string, data: any, handler: Function) {
    this.confirmationService.confirm({
      header,
      message,
      accept: async () => {
        console.log('fn :: ', handler);
        handler();
        this.showSuccess({ msg: 'Deleted', details: 'Report(s) deleted successfully' });
      },
      reject: () => {

      },
    });
  }
}
