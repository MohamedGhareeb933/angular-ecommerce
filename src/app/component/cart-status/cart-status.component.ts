import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  cartTotalQuantity: number = 0;
  cartTotalPrice : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.InitialCartServices();
  }

  InitialCartServices() : void {
    
    this.cartService.totalPrice.subscribe(
      index => this.cartTotalPrice = index
    )

    this.cartService.totalQuantity.subscribe(
      index => this.cartTotalQuantity = index
    )
    
  }
}
