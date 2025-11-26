import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/create-auth.dto';
import { AuthFactoryService } from './factory';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService:AuthFactoryService

  ) {}

  @Post("/register")
  async register(@Body() registerDTO : RegisterDTO) {
    const customer = await this.authFactoryService.createCustomer(registerDTO)
    const createdCustomer = await this.authService.register(customer);

    return {
      message:"user register successfully",
      success:true,
      data:createdCustomer
    }

  }
  @Get("/login")
  async login(@Body() loginDTO : LoginDTO){
    const accessToken =  await this.authService.login(loginDTO)
    //console.log(accessToken);
    
    return{
      message:"login successfully",
      success:true,
      data:{accessToken}
    }  
  }


}
