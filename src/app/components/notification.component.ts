import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertService, CartService } from '../services';

@Component({ 
    selector: 'app-notification', 
    template: `
    <div *ngIf="message" class="toast-container position-fixed p-3" style="left: 45%; z-index:10005">
        <div class="toast show text-white {{status}}">
            <div class="toast-header py-3 px-5">
                {{message}}
            </div>
        </div>
    </div>`
})
export class NotificationComponent implements OnInit, OnDestroy {
    cleanup = new Subject();
    message = '';
    status = 'bg-primary';
    timer: any;

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alertService.notification
            .pipe(takeUntil(this.cleanup))
            .subscribe(msg => {
                clearTimeout(this.timer);
                if(msg) {
                    this.status = msg.type === 'success' ? 'bg-primary' : 'bg-danger';
                    this.message = msg.message;
                } else {
                    this.message = ''
                }
                
                this.timer = setTimeout(() => {
                    this.message = '';
                    clearTimeout(this.timer);
                }, 3000);
            });
    }

    ngOnDestroy() {
        this.cleanup.next(true);
        this.cleanup.complete();
    }
}