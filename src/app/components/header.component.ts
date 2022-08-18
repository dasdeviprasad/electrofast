import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CartService, ProductService } from '../services';
import { Subject, takeUntil } from "rxjs";

@Component({ selector: 'app-header', templateUrl: 'header.component.html' })
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('closebutton')
    closebutton?: ElementRef<HTMLElement>;
    cleanup = new Subject();

    cartCount = 0;

    keyword = 'name';
    data = [];


    selectEvent(item: any) {
        // do something with selected item
        console.log('Select:', item);
        this.prodService.search(item.search, true);
    }

    onChangeSearch(val: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
        this.prodService.search(val);
    }

    onSearchInitiated(searchText: string) {
        this.prodService.search(searchText, true);
    }

    onInputCleared(data: any) {
        this.prodService.get();
    }

    constructor(private cartService: CartService, private prodService: ProductService) { }

    ngOnInit() {
        this.cartService.getCart()
        .pipe(takeUntil(this.cleanup))
        .subscribe(data => {
            this.cartCount = data.length;
        });

        this.prodService.filteredProducts
            .pipe(takeUntil(this.cleanup))
            .subscribe((data: any) => {
                this.data = data;
            });
    }

    ngOnDestroy() {
        this.cleanup.next(null);
        this.cleanup.complete();
    }

    closeModal() {
        this.closebutton?.nativeElement.click();
    }

    itemFilter(items: any[], query: string) {
        const list: any[] = [];
        items.forEach((item: any) => {
            if(item.name.toLocaleLowerCase().indexOf(query.trim().toLocaleLowerCase()) != -1) {
                list.push({name: item.name, search: item.name});
            } else {
                item.products.forEach((prod: any) => {
                    if(prod['product_number'].toLocaleLowerCase().indexOf(query.trim().toLocaleLowerCase()) != -1) {
                        list.push({name: `${item.name} - ${prod['product_number']}`, search: prod['product_number']});
                    }
                });
            }
        });

        return list;
    }

    selectedValueRender(value: any) {
        console.log('Selected', value);
        return value.name;
    }
}
