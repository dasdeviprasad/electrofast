import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private readonly baseUrl;
    constructor(private http: HttpClient) {
        this.baseUrl = 'http://44.207.22.242'
    }

    login(email: string, password: string) {
        return this.http.post(`${this.baseUrl}/login`, {email, password});
    }
}