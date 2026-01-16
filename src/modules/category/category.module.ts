import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategoryRepo, categorySchema } from '@models/index';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CategoryFactoryService } from './factory/category.factory';
import { JwtService } from '@nestjs/jwt';
import { UserMongoMoule } from '@shared/index';
import { CloudnairyService } from '@common/helpers/cloudnairy.helper';

@Module({
  imports:[
    UserMongoMoule,
    MongooseModule.forFeature([{name:Category.name,schema:categorySchema}])],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepo,CategoryFactoryService,JwtService,CloudnairyService],
  exports:[CategoryService,CategoryRepo,CategoryFactoryService]
})
export class CategoryModule {}
