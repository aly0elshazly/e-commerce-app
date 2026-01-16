import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryRepo } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo:CategoryRepo){}
  async create(category:Category) {
    const categoryExist =await this.categoryRepo.getOne({slug:category.slug})
    if( categoryExist) throw new ConflictException("category is already exist");
    return await this.categoryRepo.create(category);
  }

  async findAll(limit:number,page:number,) {
    const skip = (page -1) * limit;

    const categories = await this.categoryRepo.getAll({},{},
      {populate:[{path:'createdBy',select:"userName createdAt updatedAt  -_id -role"}
      ,{path:'updatedBy',select:"userName createdAt updatedAt  -_id -role"}],
      limit,skip
    });
    return categories


  }

  async findOne(id: string | Types.ObjectId) {
    const categoryExist = await this.categoryRepo.getOne({_id:id},{},{populate:[{path:'createdBy'},{path:'updatedBy'}]})
    if(!categoryExist) throw new NotFoundException("category doesn't exist ")
    return categoryExist
  }

  async update(id: string, category: Category) {
   const categoryExist =await this.categoryRepo.getOne({slug:category.slug,_id:{$ne:id}})
   
   if(categoryExist) throw new ConflictException("category already exist")
   return await this.categoryRepo.updateOne({_id:id},category,{new:true})
  }

  async remove(id: string) {
    const categoryExist = await this.categoryRepo.remove({_id:id})
    if(!categoryExist) throw new NotFoundException("category not found")
    return categoryExist

  }
  async updateLogo(id:string,logoUrl:string,logoPublicId:string){
    const category = await this.categoryRepo.getOne({_id:id})
    if(!category) throw new ConflictException("category not found")
    return await this.categoryRepo.updateOne({_id:id},{logo:logoUrl,logoPublicId:logoPublicId},{new:true})
    
  }
}
