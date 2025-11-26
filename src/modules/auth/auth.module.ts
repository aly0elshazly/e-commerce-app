import { Module } from '@nestjs/common';
import { UserMongoMoule } from '@shared/index';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[UserMongoMoule],
  controllers: [AuthController],
  providers: [AuthService ,AuthFactoryService, JwtService ],
})
export class AuthModule {}
