import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  data!: BehaviorSubject<any[]>;

  constructor(
    private cartService: CartService,
    private router: Router) {
  }

  ngOnInit() {
    this.data = this.cartService.getCart();
  }

  removeItem(item: any) {
    this.cartService.remove(item);
  }

  checkout() {
    this.router.navigate(['checkout']);
  }
}
