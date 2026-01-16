import { PartialType } from '@nestjs/mapped-types';
import { AddToCartDto } from './addtoCart.dto';

export class UpdateCartDto extends PartialType(AddToCartDto) {}
