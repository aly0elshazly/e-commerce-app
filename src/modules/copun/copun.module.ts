import { Module } from '@nestjs/common';
import { CopunService } from './copun.service';
import { CopunController } from './copun.controller';
import { copunFactoryService } from './factory/copun.factory';
import { JwtService } from '@nestjs/jwt';
import { UserMongoMoule } from '@shared/index';
import { CopunRepo, copunSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { Copun } from './entities/copun.entity';

@Module({
  imports:[
    UserMongoMoule,
    MongooseModule.forFeature([{name:Copun.name,schema:copunSchema}])

  ],
  controllers: [CopunController],
  providers: [CopunService,copunFactoryService,JwtService,CopunRepo],
})
export class CopunModule {}
