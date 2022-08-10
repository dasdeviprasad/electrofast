import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly baseUrl;
    public products = new Subject<any[]>();
  
    constructor(private http: HttpClient) {
      this.baseUrl = 'http://44.207.22.242'
    }

    getProducts() {
        return this.http.get(`${this.baseUrl}/product`).subscribe(data => {
          console.log(data);
          this.products.next(data as any[]);
          return data;
        });
    }
  }