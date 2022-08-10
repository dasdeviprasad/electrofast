import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private products = new BehaviorSubject<any[]>([]);
  
    constructor() { 
      var items = localStorage.getItem('cartitems');
      console.log('Items', items);
      if(items && this.products.getValue().length == 0) {
        this.products.next(JSON.parse(items));
      }
    }
    

    getCart() {
        return this.products;
    }

    add(item: any) {
      const {image_url, name, part, quantity} = item;
      const cartItems = this.products.getValue();
      const matchIdx = cartItems.findIndex(x => x.part.toLocaleLowerCase() == part.toLocaleLowerCase());

      if(matchIdx != -1) {
        cartItems[matchIdx].quantity += quantity;
        cartItems[matchIdx].selected = true;
      } else {
        cartItems.push({image_url, name, part, quantity: 100, selected: true});
      }

      this.persist(cartItems);
      this.products.next(cartItems);
    }


    remove(item: any) {
      const cartItems = this.products.getValue();
      const matchIdx = cartItems.findIndex(x => x.part.toLocaleLowerCase() == item.part.toLocaleLowerCase());
      if(matchIdx != -1) {
        cartItems.splice(matchIdx, 1);
      }

      this.persist(cartItems);
      this.products.next(cartItems);
    }

    select(item: any, isSelected: boolean) {
      const cartItems = this.products.getValue();
      const matchIdx = cartItems.findIndex(x => x.part.toLocaleLowerCase() == item.part.toLocaleLowerCase());
      if(matchIdx != -1) {
        cartItems[matchIdx].selected = isSelected;
      }

      this.persist(cartItems);
      this.products.next(cartItems);
    }

    selectAll(isSelected: boolean) {
      const cartItems = this.products.getValue();
      cartItems.forEach(x => {
        x.selected = isSelected;
      })

      this.persist(cartItems);
      this.products.next(cartItems);
    }

    private persist(cartItems: any[]) {
      localStorage.setItem('cartitems', JSON.stringify(cartItems));
    }
  }