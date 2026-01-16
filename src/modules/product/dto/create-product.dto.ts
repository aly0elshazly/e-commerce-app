import { 
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsNumber,
  IsEnum,
  Min,
  IsOptional,
  IsArray,
  Validate
} from "class-validator";
import { Type } from "class-transformer";
import { DiscountType } from "@common/types";
import {  isValidDiscount } from "@common/decorators";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsMongoId()
  @IsNotEmpty()
  brandId: string;


  @Type(() => Number)
  @IsNumber()
  @Min(1)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  @isValidDiscount({message:"invalid discount amount"})
  discountAmount?: number;

  @IsEnum( DiscountType)
  @IsOptional()
  discountType?: DiscountType;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;


  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sizes?: string[];
}
