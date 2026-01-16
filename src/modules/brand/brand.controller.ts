import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, BadRequestException, UseInterceptors } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory/brand.factory';
import { Auth, imageUpload, User } from '@common/decorators';
import { CloudnairyService } from '@common/index';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { Brand } from './entities/brand.entity';

@Controller('brand')
@Auth(["Admin"])
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactoryService:BrandFactoryService,
    private readonly cloudnairyService:CloudnairyService
    
    ) {}

@Post()
async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
  const brand = this.brandFactoryService.createBrand(createBrandDto, user);
  const createdBrand = await this.brandService.create(brand);
  return {
    success: true,
    message: "Brand created successfully",
    data: createdBrand,
  };
}   
    @Post(":id/logo")
    @imageUpload("logo","brands",true)
      async uploadFileCloud(@UploadedFile() logo:Express.Multer.File,@Param('id') id:string){
  
        if(!logo) throw new BadRequestException("no file uploaded");
  
        const publicId = `${id}-${Date.now()}`;
        const folder = "brands"
  
      const result = await this.cloudnairyService.upload(
      logo.buffer,
      folder,
      publicId
      );
      if (!result || typeof result !== 'object' || !('secure_url' in result)) {
    throw new BadRequestException('InternalServerError');
       } 
       const logoObj = {url:result.secure_url,publicId:result.public_id}
       await this.brandService.addLogo(id,logoObj)
  
  
      return {
       message: "Uploaded to cloud successfully",
       url: result.secure_url,
       publicId: result.public_id,
        };
      }
  

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const brand = await this.brandService.findOne(id);
    return {
      success:true,
      data:{brand}
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() brand: Brand) {
    const updatedBrand =await this.brandService.update(id,brand)
    return {
      success:true,
      message:"brand updated successfully",
      data:updatedBrand
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedBrand = await this.brandService.remove(id)
    return {
      success:true,
      message:"brand deleted successfully"
    }
  }

}
