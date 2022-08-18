import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertService, ProductService } from '../services';
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  cleanup = new Subject();
  data: any[] = [];
  selectedItem?: any;

  constructor(private prodService: ProductService,
    private alertService: AlertService,
    private cartService: CartService) {
  }

  ngOnInit() {
    this.prodService.products
      .pipe(takeUntil(this.cleanup))
      .subscribe(data => {
        this.data = data;
      });
    this.prodService.get();
  }

  ngOnDestroy() {
    this.cleanup.next(null);
    this.cleanup.complete();
  }

  addToCart() {
    const products = this.selectedItem.products.filter((x: any) => x.selected);
    const prodNumbers = products.map((x: any) => x.product_number);
    this.alertService.success(`${this.selectedItem.name} - ${prodNumbers.join(", ")} ${prodNumbers.length >1 ? "are" : "is"} added to Cart.`);
    prodNumbers.forEach((pnum: any) => {
      this.cartService.add({
        name: this.selectedItem.name,
        image_url: this.selectedItem.image_url,
        part: pnum,
        quantity: 100
      });
    });

    // Unselect all the items after it is added to cart.
    this.selectedItem.products.forEach((item: any) => {
      item.selected = false;
    });
  }

  selectItem(item: any) {
    console.log(item);
    this.selectedItem = item;
  }

  toggleItem(prodNum: string) {
    const idx = this.selectedItem.products.findIndex((prod: any) => prod.product_number == prodNum);
    if (idx !== -1) {
      this.selectedItem.products[idx].selected = !this.selectedItem.products[idx].selected;
    }
  }
}
