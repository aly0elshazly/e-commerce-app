import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerRepo } from '@models/index';
import { UserMongoMoule } from '@shared/index';

@Module({
  imports:[UserMongoMoule],
  controllers: [CustomerController],
  providers: [CustomerService,JwtService],
})
export class CustomerModule {}
