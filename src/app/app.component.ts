import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ElectroFast';

  data = [
    {
      url: 'https://electrofast.com/images/051135-08017.png',
      name: '3M MARINE SILICONE SEALANT',
      part: '051135-08017'
    }, 
    {
      url: 'https://electrofast.com/images/051135-08019.png',
      name: '3M CLEAR SEALANT',
      part: '051135-08019'
    }, 
    {
      url: 'https://electrofast.com/images/051135-08609.png',
      name: 'WINDOW WELD (BLACK) 10.5 OZ',
      part: '051135-08609'
    }, 
    {
      url: 'https://electrofast.com/images/051135-06560.png',
      name: '3M CLEAR SEALANT',
      part: '51135-06560'
    }, 
  ]

  cartItems = [
    {
      url: 'https://electrofast.com/images/051135-08017.png',
      name: '3M MARINE SILICONE SEALANT',
      part: '051135-08017',
      quantity: 2
    }, 
    {
      url: 'https://electrofast.com/images/051135-08019.png',
      name: '3M CLEAR SEALANT',
      part: '051135-08019',
      quantity: 3
    }
  ];
}
