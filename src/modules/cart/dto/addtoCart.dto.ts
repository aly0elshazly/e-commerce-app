import { IsMongoId, IsNumber, IsOptional } from "class-validator";
import { ObjectId, Types } from "mongoose";

export class AddToCartDto {

    @IsMongoId()
    productId : Types.ObjectId;

    @IsNumber()
    @IsOptional()
    quantity : number;    
}

