import { CartItem } from "./cart-item";

export class OrderItem {

    imageUrl: string; 
    quantity: number;
    productId: number;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quatity;
        this.productId = cartItem.id;
     }
}
