import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/addtoCart.dto';
import { Auth, User } from '@common/decorators';

@Controller('cart')
@Auth(["Customer","Admin"])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() AddToCartDto:AddToCartDto ,@User() user:any) {
    const cart = await this.cartService.addToCart(AddToCartDto,user);
    return {
      success:true,
      message:"cart updated successfully",
      data:{
        cart
      }
    }


  }

  @Delete("remove/:productId")
  async removeFromCart(@Param('productId') productId: string,@User() user:any) {
    await this.cartService.removeFromCart(productId,user);
    return {
      success:true,
      message:"product removed successfully"
    }

    
  }
}
