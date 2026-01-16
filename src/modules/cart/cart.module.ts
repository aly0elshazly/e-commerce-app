import { CartRepo } from '@models/cart/cart.repo';
import { Cart, cartSchema } from '@models/cart/cart.schema';
import { ProductModule } from '@modules/product/product.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoMoule } from '@shared/index';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports:[ProductModule,UserMongoMoule,
    MongooseModule.forFeature([{name:Cart.name,schema:cartSchema}])
  ],
  controllers: [CartController],
  providers: [CartService,CartRepo,JwtService],
  exports:[CartService,CartRepo]
})
export class CartModule {}
