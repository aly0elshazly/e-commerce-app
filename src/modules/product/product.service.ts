import { BrandService } from '@modules/brand/brand.service';
import { CategoryService } from '@modules/category/category.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProductRepo } from 'src/models';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo : ProductRepo,
    private readonly categoryService:CategoryService,
    private readonly brandService:BrandService
  ){}
  async create(product:Product,user:any) {
    await this.categoryService.findOne(product.categoryId)
    await this.brandService.findOne(product.brandId)    

    const productExist = await this.productRepo.getOne({slug:product.slug,$or:[{createdBy:user._id},{updatedBy:user._id}]})
    if(productExist){
     return await this.update(productExist._id,product)
    }



    return await this.productRepo.create(product)
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string | Types.ObjectId) {
    const productExist = await this.productRepo.getOne({_id:id},{},{populate:[{path:"createdBy",select:"userName:1,_id:0,role:0,id:0"},{path:"updatedBy",select:"userName:1,_id:0,role:0,id:0"}]})    
    if(!productExist) throw new NotFoundException("product not found")
      return productExist
  }

  async update(id: string|Types.ObjectId, product: Product) {
    const porductExist = await this.productRepo.getOne({_id:id})
    if(!porductExist) throw new NotFoundException("product not found")
    const colors = new Set<string>(porductExist.colors);
    for (const color of product.colors!) {  
      colors.add(color)
      
    }
    product.colors = Array.from(colors)
    const sizes = new Set<string>(porductExist.sizes);
    for (const size of product.sizes!) {  
      colors.add(size)
      
    }
    product.colors = Array.from(sizes)
    product.stock! += porductExist.stock
    return this.productRepo.updateOne({_id:id},product,{new:true})
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
