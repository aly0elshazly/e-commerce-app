import { BrandModule } from '@modules/brand/brand.module';
import { CategoryModule } from '@modules/category/category.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductRepo, ProductSchema } from 'src/models';
import { UserMongoMoule } from 'src/shared';
import { ProductFactoryService } from './factory/product.factory';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports : [UserMongoMoule,
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),CategoryModule,BrandModule
  ],
  controllers: [ProductController],
  providers: [ProductService,ProductFactoryService,ProductRepo,JwtService],
  exports :[ProductService,ProductRepo]
  
})
export class ProductModule {}
