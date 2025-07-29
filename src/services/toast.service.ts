import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private messageService: MessageService) { }

    public showDialog: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    success(summary: string, detail: string, life = 3000) {
        this.messageService.add({ severity: 'success', summary, detail, life });
    }

    error(summary: string, detail: string, life = 5000) {
        this.messageService.add({ severity: 'error', summary, detail, life });
    }

    info(summary: string, detail: string, life = 4000) {
        this.messageService.add({ severity: 'info', summary, detail, life });
    }

    warn(summary: string, detail: string, life = 4000) {
        this.messageService.add({ severity: 'warn', summary, detail, life });
    }

    clear() {
        this.messageService.clear();
    }
}
