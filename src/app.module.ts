import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './modules/customer/customer.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filters';
import { CopunModule } from './modules/copun/copun.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load:[devConfig],
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(ConfigService:ConfigService)=>({
        uri:ConfigService.get('db').url,

      })
    }),

    
  AuthModule, ProductModule, CategoryModule, BrandModule, CustomerModule, CopunModule, CartModule, OrderModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_FILTER,
    useClass:HttpExceptionFilter
  }],
})
export class AppModule {}
