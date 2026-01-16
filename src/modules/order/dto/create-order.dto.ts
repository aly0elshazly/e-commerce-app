import { CopunDetails, PaymentMethod } from "@models/index";
import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

class AddressDto{
    @IsString()
    street:string;
    @IsString()
    city:string;
    @IsString()
    country:string;
    @IsString()
    code:string;
    @IsString()
    phoneNumber:string;
}
class copunDetail{
    @IsString()
    copunId:string;
    @IsNumber()
    discountAmount:number;
    @IsString()
    code:string
}

export class CreateOrderDto {
    @IsObject()
    address:AddressDto;

    @IsString()
    @IsEnum(PaymentMethod)
    paymentMethod:PaymentMethod;

    @IsObject()
    @IsOptional()
    copun?:CopunDetails;
    //products?:[{
        //productId:string,
        //quantity:number
    //}]
}
