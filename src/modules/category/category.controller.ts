import { Auth, Public, User } from '@common/decorators';
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory/category.factory';
import { imageUpload } from '@common/decorators/upload.decorator';
import { CloudnairyService } from '@common/helpers/cloudnairy.helper';

@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(
    private readonly categoryFactoryService:CategoryFactoryService,
    private readonly categoryService: CategoryService,
    private readonly cloudnairyService:CloudnairyService

  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto,@User() user:any) {
    const category = await this.categoryFactoryService.createCategory(createCategoryDto,user);
    const createdCategory =await  this.categoryService.create(category);
    return {
      message:"category created successfully",
      success:true,
      data:{createdCategory}
    }

  }
  
  @Public()
  @Get()
  async findAll(
    @Query('limit') limit:string,
    @Query('page') page: string,
  ) 
  {
    const categories = await this.categoryService.findAll(limit? parseInt(limit):10,page ? parseInt(page) : 1)
    return{
      success:true,
      data:{categories}

    }

  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return{
      success:true,
      data:{category}
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,@User() user:any) {
    
    const category = await this.categoryFactoryService.updateCategory(id,updateCategoryDto,user);
    
    const updatedCategory = await this.categoryService.update(id,category)
    
    return {
      success:true,
      message:"category updated successfully",
      data:updatedCategory
    }

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedcategory = await this.categoryService.remove(id)
    return {
      success:true,
      mesasge:"category deleted successfully"
    }
    
  }

   @Post(":id/upload")
    @imageUpload("logo","categories")
    uploadFile(@UploadedFile() logo:Express.Multer.File,@Param() id:string) {
      if(!logo) throw new BadRequestException("no file uploaded")
      return {
        message: 'File uploaded successfully',
        filename: logo.filename,
        path: `/uploads/${logo.filename}`,
        originalName: logo.originalname,
        size: logo.size,
      };
  
    }
    @Post(":id/upload-cloud")
    @imageUpload("logo","categories",true)
    async uploadFileCloud(@UploadedFile() logo:Express.Multer.File,@Param('id') id:string){

      if(!logo) throw new BadRequestException("no file uploaded");

      const publicId = `${id}-${Date.now()}`;
      const folder = "categories"

    const result = await this.cloudnairyService.upload(
    logo.buffer,
    folder,
    publicId
    );
    if (!result || typeof result !== 'object' || !('secure_url' in result)) {
  throw new BadRequestException('Failed to upload to Cloudinary');
}


    return {
     message: "Uploaded to cloud successfully",
     url: result.secure_url,
     publicId: result.public_id,
      };
    }

}
