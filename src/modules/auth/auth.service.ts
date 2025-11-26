import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerRepo, UserRepo } from '../../models';
import { Customer } from './entities/auth.entity';
import { sendMail } from '@common/index';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    private readonly congigService:ConfigService,

    private readonly customerrepo:CustomerRepo,

    private readonly jwtService:JwtService,

    private readonly userRepo:UserRepo
  ){}
  async register(customer:Customer) {
    const customerExist  = await this.customerrepo.getOne({
      email:customer.email
    });
    if (customerExist) throw new ConflictException("user already exist");
    const createdCustomer =  await this.customerrepo.create(customer);
    sendMail({
      to:customer.email,
      subject:"confirm email",
      html:`<h1> your otp is ${customer.otp} <h1>`
    })
    const {password , otp , otpExpiry, ...customerOpj} = JSON.parse(JSON.stringify(createdCustomer))
    return customerOpj as Customer ;
    

  }
  // todo confirm email
  async login(loginDTO:LoginDTO){
    const customerExist = await this.userRepo.getOne({email:loginDTO.email})
    if(!customerExist){
      throw new UnauthorizedException("user dosen't exist")
    }
    const match = await bcrypt.compare(loginDTO.password ,customerExist.password)
    if(!match){
      throw new UnauthorizedException("password not correct ")
    }

   const accessToken =  this.jwtService.sign({
      _id:customerExist.id,
      role:"customer",
      email:customerExist.email
    },{secret:this.congigService.get("access").jwt_secret,expiresIn:"1d"}
  )
  
    return accessToken;


  }
  

  
}
