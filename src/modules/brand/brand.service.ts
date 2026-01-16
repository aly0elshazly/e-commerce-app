import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepo } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor (private readonly brandRepo:BrandRepo){}
  async create(brand:Brand ) {
    const brandExist = await this.brandRepo.getOne({slug:brand.slug})
    if(brandExist) throw new ConflictException("brand already exist")
    return await this.brandRepo.create(brand)
    
  }
  async addLogo(id: string, logo: { url: string; publicId: string }) {
    const brand = await this.brandRepo.getOne({ _id: id });
    if (!brand) throw new NotFoundException("Brand not found");

    return await this.brandRepo.updateOne(
      { _id: id },
      { logo },
      { new: true }
    );
  }

  findAll() {
    return `This action returns all brand`;
  }

  async findOne(id: string | Types.ObjectId) {
    const brandExist = await this.brandRepo.getOne({_id:id},{},{populate:[{path:'createdBy'},{path:'updatedBy'}]})
    if(!brandExist) throw new NotFoundException("brand not exist")
      return brandExist
  }

  async update(id: string, brand: Brand) {
    const brandExist = await this.brandRepo.getOne({_id:id})
    if(!brandExist) throw new NotFoundException("brand not found")
    return await this.brandRepo.updateOne({_id:id},brand,{new:true})
  }

  async remove(id: string) {
    const brand = await this.brandRepo.remove({_id:id})
    if(!brand) throw new NotFoundException("Brand Not Fround")
    return brand

  }
}
