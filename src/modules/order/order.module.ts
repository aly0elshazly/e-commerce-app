import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartService } from '@modules/cart/cart.service';
import { CartRepo } from '@models/cart/cart.repo';
import { OrderRepo, OrderSchema } from '@models/index';
import { CartModule } from '@modules/cart/cart.module';
import { ProductModule } from '@modules/product/product.module';
import { UserMongoMoule } from '@shared/index';
import { BrandModule } from '@modules/brand/brand.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { JwtService } from '@nestjs/jwt';
import { Cart } from '@modules/cart/entities/cart.entity';
import { cartSchema } from '@models/cart/cart.schema';

@Module({
  imports: [
    UserMongoMoule,
    CartModule,
    ProductModule,
    BrandModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Cart.name, schema: cartSchema },
    ]),
    
  ],
  controllers: [OrderController],
  providers: [OrderService,CartService,CartRepo,OrderRepo,JwtService],
})
export class OrderModule {}
