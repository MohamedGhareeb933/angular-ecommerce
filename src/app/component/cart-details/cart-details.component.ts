import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  cartTotalQuantity: number = 0;
  cartTotalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.initCartItems();
  }

  initCartItems() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.cartTotalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.cartTotalQuantity = data
    );
    
  }

  increment(cartitem: CartItem) {
    this.cartService.addToCart(cartitem);
  }

  decrement(cartitem: CartItem) {
    this.cartService.decrementItem(cartitem);
  }

  remove(cartitem: CartItem) {
    this.cartService.removeItem(cartitem);
  }

}
