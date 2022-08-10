import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../services';

@Component({ selector: 'app-header', templateUrl: 'header.component.html' })
export class HeaderComponent implements OnInit {
    @ViewChild('closebutton')
    closebutton?: ElementRef<HTMLElement>;

    cartCount = 0;

    constructor(private cartService: CartService) {}

    async ngOnInit() {
        this.cartService.getCart().subscribe(data => {
            this.cartCount = data.length;
        });
    }

    closeModal() {
        this.closebutton?.nativeElement.click();
    }
}