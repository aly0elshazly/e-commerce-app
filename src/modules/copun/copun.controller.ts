import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CopunService } from './copun.service';
import { CreateCopunDto } from './dto/create-copun.dto';
import { UpdateCopunDto } from './dto/update-copun.dto';
import { copunFactoryService } from './factory/copun.factory';
import { Auth, User } from '@common/decorators';

@Controller('copun')
@Auth(["Admin","Seller"])
export class CopunController {
  constructor(
    private readonly copunService: CopunService,
    private readonly coopunFactooryService:copunFactoryService

  ) {}

  @Post()
  async create(@Body() createCopunDto: CreateCopunDto,@User() user:any) {
    const copun = this.coopunFactooryService.createCopun(createCopunDto,user)    
    const createdCopun = await this.copunService.create(copun,user);
    return {
      message:"copun created successfully",
      data:{createdCopun}
    }
    
  }

}
