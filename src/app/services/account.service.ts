import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from "./config";

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post(`${BASE_URL}/login`, {email, password});
    }
}