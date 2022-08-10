import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private message = new BehaviorSubject<any>({});

    get notification() { return this.message; }

    success(message: string) {
        this.message.next({type: 'success', message});
    }

    error(message: string) {
        this.message.next({type: 'error', message});
    }
}