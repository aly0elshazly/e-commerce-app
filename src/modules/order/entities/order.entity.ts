import { Address, CopunDetails, OrderSatatus, PaymentMethod, productOrder } from "@models/index";
import { Types } from "mongoose";

export class Order {
    readonly _id: Types.ObjectId;
    userId: Types.ObjectId;
    address:Address;
    products:productOrder[];
    paymentMethod: PaymentMethod;
    status: OrderSatatus;
    totalAmount: number;
    copun?: CopunDetails;
}
