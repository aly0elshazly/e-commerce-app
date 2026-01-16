import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from '@modules/cart/cart.service';
import { ProductService } from '@modules/product/product.service';
import { OrderRepo, ProductRepo } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  constructor (
    private readonly cartService:CartService,
    private readonly productRepo:ProductRepo,
    private readonly orderRepo:OrderRepo
  ){}
  async create(createOrderDto: CreateOrderDto,user:any) {
    const cart = await this.cartService.findOne(user);
    if(cart.products.length == 0) throw new NotFoundException("cart is empty")

    const failProducts : {productId:Types.ObjectId; reson:string}[] = [];
    const successProducts : 
    {productId:Types.ObjectId;
       quantity:number;
       price:number;
       discount:number;
       totalPrice:number;
       }[] = [];
    for (const product of cart.products){
      const productExist = await this.productRepo.getOne({_id:product.productId})
      if(!productExist) {
        failProducts.push({
          productId:product.productId,
          reson:"product not found"
        })
        continue;
      }
      if(productExist.stock < product.quantity){
        failProducts.push({
          productId:product.productId,
          reson:"out of stock"
        })
        continue;
      }
      for (const product of cart.products) {
        const updatedProduct = await this.productRepo.updateOne(
          {_id:product.productId},
          {$inc:{stock:-product.quantity}},
          {new:true}
        )
        
      }
      successProducts.push({
        productId:product.productId,
        quantity:product.quantity,
        price:productExist.finalPrice,
        discount:productExist.discountAmount,
        totalPrice:productExist.finalPrice * product.quantity
      })

    }
    if(failProducts.length > 0){
      return failProducts;
    }
    
    const order = await this.orderRepo.create({
      userId:user._id,
      address:createOrderDto.address,
      products:successProducts,
      paymentMethod:createOrderDto.paymentMethod,
      copun:createOrderDto.copun,
      totalAmount:successProducts.reduce(
        (acc,cur)=>{
          return acc + cur.totalPrice
        },0
      )

    })
    await this.cartService.clearCart(user);
    return order

  }

}
