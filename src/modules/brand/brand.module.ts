import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './factory/brand.factory';
import { Brand, BrandRepo, brandSchema } from '@models/index';
import { UserMongoMoule } from '@shared/index';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { CloudnairyService } from '@common/index';

@Module({
  imports:[
    UserMongoMoule,
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }])
  ],
  controllers: [BrandController],
  providers: [BrandService,BrandFactoryService,BrandRepo,JwtService,CloudnairyService],
  exports:[BrandService,BrandRepo,BrandFactoryService]
})
export class BrandModule {}
