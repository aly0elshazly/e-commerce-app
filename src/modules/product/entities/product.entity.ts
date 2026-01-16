import { Types } from "mongoose";
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsMongoId,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsArray,
  ArrayMinSize,
  IsOptional,
} from "class-validator";
import { DiscountType } from "@common/types";


export class Product {
  readonly _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  createdBy: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  updatedBy: Types.ObjectId;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discountAmount?: number;

  @IsEnum(DiscountType)
  @IsOptional()
  discountType?: DiscountType;

  finalPrice: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  sold?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sizes?: string[];
}
