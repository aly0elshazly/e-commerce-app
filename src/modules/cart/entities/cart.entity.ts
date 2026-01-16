import { Types } from "mongoose";

export class productCart{
    productId:Types.ObjectId;

    quantity:number
}

export class Cart{

    _id:Types.ObjectId;

    userId:Types.ObjectId

    products:productCart[]

}