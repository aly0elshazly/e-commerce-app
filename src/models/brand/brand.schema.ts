import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Brand{
    _id:Types.ObjectId;
    
    @Prop({type:String,required:true,unique:true,trim:true})
    name:string;

    @Prop({type:String,required:true,unique:true,trim:true})
    slug:string;

    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"User"})
    createdBy:Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId,required:true,ref:"User"})
    updatedBy:Types.ObjectId;

    @Prop()
    logo:object;
}