import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // ReplaySubject is subclass of Subject(observable) means that it can pub events to subs and replay the pub to late initials
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem): void {

    // check if we already have items in cart 
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;


    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id 
      existingCartItem = this.cartItems.find(IndexItem => IndexItem.id === cartItem.id);
    }

    // if the item already exist in the cart  
    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart) {
      // increment the existed item quantity 
      existingCartItem!.quatity++;
    } else {
      // otherwise push the item in the cart 
      this.cartItems.push(cartItem);
    }

    // compute the cart total price and quatity 
    this.computeCartTotal();

  }

  computeCartTotal(): void {

    let computeCartPrice: number = 0;
    let computeCartQuatity: number = 0;

    for (let cartIndex of this.cartItems) {
      computeCartPrice += cartIndex.unitPrice * cartIndex.quatity;
      computeCartQuatity += cartIndex.quatity;
    }

    // publish the new values to the subs 
    // next means send or publish
    this.totalPrice.next(computeCartPrice);
    this.totalQuantity.next(computeCartQuatity);

    console.log(`cart quantity:${computeCartQuatity}, cart total Price:${computeCartPrice} `);
  }

  decrementItem(cartItem: CartItem): void {

    cartItem.quatity--;

    if (cartItem.quatity === 0) {
      this.removeItem(cartItem);
    } else {
      this.computeCartTotal();
    }
  }

  removeItem(cartItem: CartItem): void {
    let index: number = this.cartItems.indexOf(cartItem);

    if (this.cartItems.length > -1) {
      this.cartItems.splice(index, 1);
    }

    this.computeCartTotal();
  }

}
