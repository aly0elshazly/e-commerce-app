import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class productOrder{
    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"Product"})
    productId:Types.ObjectId;

    @Prop({type:Number,required:true})
    quantity:number;

    @Prop({type:Number,required:true})
    price:number;

    @Prop({type:Number,required:true})
    discount:number;

    @Prop({type:Number,required:true})
    totalPrice:number;

}

@Schema()
export class Address{

    @Prop({type:String,required:true})
    street:string;

    @Prop({type:String,required:true})
    city:string;
    
    @Prop({type:String,required:true})
    country:string;

    @Prop({type:String,required:true})
    code:string;
    
    @Prop({type:String,required:true})
    phoneNumber:string;
}
@Schema()
export class CopunDetails{
    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"Copun"})
    copunId:Types.ObjectId;
    @Prop({type:Number,required:true})
    discountAmount:number;
    @Prop({type:String,required:true})
    code:string
}
export enum PaymentMethod{
    COD = "COD",
    CREDIT_CARD = "CREDIT_CARD",
    E_WALLET = "E_WALLET"

}

export enum OrderSatatus{
    PENDING = "PENDING",
    PLACED = "PLACED",
    PROCESSING ="PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED",
    REFUNDED = "REFUNDED"
}

@Schema({timestamps:true})
export class Order{
    readonly _id:Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId,ref:"Customer",required:true})
    userId:Types.ObjectId

    @Prop({type:Address,required:true})
    address:Address;

    @Prop({type:[productOrder],required:true})
    products:productOrder[];
    
    @Prop({type:String,enum:PaymentMethod,default:PaymentMethod.COD})
    paymentMethod:PaymentMethod;

    @Prop({type:String,enum:OrderSatatus,default:function(){
        if(this.paymentMethod == PaymentMethod.COD)
            return OrderSatatus.PLACED
        return OrderSatatus.PENDING;
    }})
    status:OrderSatatus;

    @Prop({type:Number,required:true})
    totalAmount:number;

    @Prop({type:CopunDetails})
    copun:CopunDetails


    
}

export const OrderSchema = SchemaFactory.createForClass(Order);