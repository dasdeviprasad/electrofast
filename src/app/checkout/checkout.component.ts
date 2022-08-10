import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services';
import { getAddress } from '../utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  data!: BehaviorSubject<any[]>;
  addresses!: any[];

  constructor(private cartService: CartService,
    private router: Router) {
  }

  ngOnInit() {
    this.data = this.cartService.getCart();

    const add = getAddress();

    if(add && add.length > 0) {
      add.push(add[0]);
      add.push(add[0]);
      this.addresses = add;
    }
  }

  removeItem(item: any) {
    this.cartService.remove(item);
  }

  onSelect(item: any, event: any) {
    console.log(event.target.checked);
    this.cartService.select(item, event.target.checked);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
