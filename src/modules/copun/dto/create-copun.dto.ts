import { isValidDiscount, isValidToDate } from "@common/decorators";
import { DiscountType } from "@common/types";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, isDate, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinDate } from "class-validator";
import { Types } from "mongoose";

export class CreateCopunDto {

    @IsString()
    @IsNotEmpty()
    @Length(5,5)
    code:string;

    @IsNumber()
    @isValidDiscount()
    discountAmount:number;

    @IsEnum(DiscountType)
    discountType:DiscountType;

    @Type(()=>Date)
    @IsDate()
    @MinDate(new Date(Date.now() - 24*60*60*1000))
    fromDate:Date;

    @Type(()=>Date)
    @IsDate()
    @isValidToDate({message : "invalid to date"})
    toDate:Date;

    @IsBoolean()
    active:boolean;

    @IsOptional()
    @IsArray()
    @IsMongoId()
    usedBy?:Types.ObjectId[]

    @IsOptional()
    @IsArray()
    @IsMongoId({each:true})
    assignTo?:Types.ObjectId[]

}
