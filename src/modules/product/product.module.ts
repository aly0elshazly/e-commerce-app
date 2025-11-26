import { Module } from '@nestjs/common';
import { AdminRepo, CustomerRepo, SellerRepo } from 'src/models';
import { UserMongoMoule } from 'src/shared';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports : [UserMongoMoule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
