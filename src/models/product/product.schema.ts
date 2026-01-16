import { DiscountType } from "@common/types";
import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({timestamps:true,toJSON:{virtuals:true}})
export class Product{
    
    @Prop({type:String,required:true,unique:true,trim:true})
    name:string;

    @Prop({type:String,required:true,unique:true,trim:true})
    slug:string;

    @Prop({type:String,required:true,trim:true})
    description:string;

    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"Category"})
    categoryId:Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"Brand"})
    brandId:Types.ObjectId;
    
    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"User"})
    createdBy:Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"User"})
    updatedBy:Types.ObjectId;

    @Prop({type:Number,min:1})
    price:number;

    @Prop({type:Number,default:0,min:1})
    discountAmount:number;
    
    @Prop({
        type:String,enum:DiscountType,default:DiscountType.fixed_amount
    })
    discountType:DiscountType;

    @Virtual({
        get:function(this:Product){
            if(this.discountType == DiscountType.fixed_amount)
                return this.price - (this.discountAmount)
            return this.price - this.price * (this.discountAmount / 100)
        }
    })
    finalPrice:number;

    @Prop({type:Number,default:1,min:0})
    stock:number;

    @Prop({type:Number,min:0})
    sold:number;

    @Prop({type:[String]})
    colors:string[];

    @Prop({type:[String]})
    sizes:string[];


}

export const ProductSchema = SchemaFactory.createForClass(Product)