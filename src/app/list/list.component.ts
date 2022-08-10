import { Component, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertService, ProductService } from '../services';
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  cleanup = new Subject();
  data: any[] = [];
  selectedItem?: any;

  constructor(private prodService: ProductService, 
    private alertService: AlertService,
    private cartService: CartService) {
  }

  async ngOnInit() {
    this.prodService.products
      .pipe(takeUntil(this.cleanup))
      .subscribe(data => {
        this.data = data;
      });
    this.prodService.getProducts();
  }

  addToCart() {
    //this.alertService.success(`${item.name} is added to Cart.`);
    debugger;
    const products = this.selectedItem.products.filter((x: any) => x.selected);

    products.forEach((prod: any) => {
      this.cartService.add({
        name: this.selectedItem.name,
        image_url: this.selectedItem.image_url,
        part: prod.product_number,
        quantity: 100
      });
    });
  }

  selectItem(item: any) {
    console.log(item);
    this.selectedItem = item;
  }

  toggleItem(prodNum: string) {
    const idx = this.selectedItem.products.findIndex((prod: any) => prod.product_number == prodNum);
    if(idx !== -1)  {
      this.selectedItem.products[idx].selected = !this.selectedItem.products[idx].selected;
    }
  }
}
