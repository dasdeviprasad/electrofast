import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { BASE_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products = new Subject<any[]>();
  public filteredProducts = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${BASE_URL}/product`).subscribe(data => {
      this.products.next(data as any[]);
      return data;
    });
  }

  search(searchTerm: string, select: boolean = false) {
    return this.http.get(`${BASE_URL}/product?search=${searchTerm}`).subscribe(data => {
      this.filteredProducts.next(data as any[]);

      if (select) {
        this.products.next(data as any[]);
      }
      return data;
    });
  }
}