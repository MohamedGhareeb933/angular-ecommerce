import { Product } from "./product";

export class CartItem {

    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    quatity: number

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.unitPrice = product.unitPrice;
        this.imageUrl = product.imageUrl;
        this.quatity = 1;
    }
}
