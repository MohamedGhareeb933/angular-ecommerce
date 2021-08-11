
import { Customer } from "./customer";
import { OrderItem } from "./order-item";
import { Address } from "./address";

export class Order {

    constructor(public customer?: Customer, public billingAddress?: Address,
        public shippingAddress?: Address, public orderItems?: OrderItem[]) {}

}
