import { imageUpload } from '@common/decorators/upload.decorator';
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @imageUpload("file")
  uploadFile(@UploadedFile() file:Express.Multer.File) {
    if(!file) throw new BadRequestException("no file uploaded")
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      originalName: file.originalname,
      size: file.size,
    };



  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
