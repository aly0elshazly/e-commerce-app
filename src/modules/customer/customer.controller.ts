import { AuthGuard } from '@common/guards';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Roles } from '@common/decorators';
import { RolesGuard } from '@common/guards/ roles.guard';

@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles(["Customer"])
  @UseGuards(RolesGuard)
  getProfile(@Request() req:any) {
    return {message:"done", success:true , data:{user:req.user}}
  }

}
