import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, User } from '@common/decorators';

@Controller('order')
@Auth(['customer','Admin'])
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto,@User() user:any) {
    const result = await this.orderService.create(createOrderDto,user);
    if(result instanceof Array){
      return{
        success:false,
        message:"order failed",
        data:result
     }
    }
    return{
      success:true,
      message:"order created successfully",
      data:result
    }
  }   

}
