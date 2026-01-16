import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/addtoCart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductService } from '@modules/product/product.service';
import { CartRepo } from '@models/cart/cart.repo';

@Injectable()
export class CartService {
  constructor(
    private readonly productService:ProductService,
    private readonly cartRepo:CartRepo

  ){}
  async creatCart(addToCartDto: AddToCartDto,user:any){
    const cart =  await this.cartRepo.create({
        userId:user._id,
        products:[{
          productId:addToCartDto.productId,
          quantity:addToCartDto.quantity ?? 1
        }]
      })
      return cart
  }
  async addToCart(addToCartDto: AddToCartDto,user:any) {
    const productExist = await this.productService.findOne(addToCartDto.productId)
    const cart = await this.cartRepo.getOne({userId:user._id})
    if(!cart){
      return await this.creatCart(addToCartDto,user) 
    }
    // check product exist in cart 

    const index = cart.products.findIndex((product)=>product.productId.equals(addToCartDto.productId));
    if(index == -1){
      cart.products.push({
        productId:addToCartDto.productId,
        quantity:addToCartDto.quantity ?? 1
      });
    }
    else{
      cart.products[index].quantity = addToCartDto.quantity;
    }
    await cart.save();
    return cart;


  }


  async removeFromCart(productId: string,user:any) {
    const product = await this.cartRepo.updateOne(
      {userId:user._id,"products.productId":productId}
      ,{$pull:{products:{productId}}}
    )
    if(!product) throw new NotFoundException("product not found ");
    return true;
    }
  
  async findOne(user:any){
    const cart = await this.cartRepo.getOne({userId:user._id})
    if(!cart) throw new NotFoundException("cart not found")
    return cart
  }
  async clearCart(user:any){
    const cart = await this.cartRepo.getOne({userId:user._id})
    if(!cart) throw new NotFoundException("cart not found")
    cart.products = [];
    await cart.save();
    return cart
  }

}
