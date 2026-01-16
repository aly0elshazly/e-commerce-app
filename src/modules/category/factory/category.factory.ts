import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category, CategoryRepo } from "@models/index";
import slugify from "slugify";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Injectable()
export class CategoryFactoryService{
    constructor(private readonly categoryRepo:CategoryRepo){}
    createCategory(createCategoryDTO:CreateCategoryDto,user:any){
        const category = new Category();
        category.name = createCategoryDTO.name;
        category.slug = slugify(createCategoryDTO.name,{replacement:'_',lower:true,trim:true});
        category.createdBy = user._id;
        category.logo = createCategoryDTO.logo;
        
        category.updatedBy = user._id;
        return category;
    }
    async updateCategory(id:string,updateCategoryDto:UpdateCategoryDto,user:any){
        const oldCategory = await this.categoryRepo.getOne({_id:id});
        const category = new Category();
        
        if(!oldCategory) throw new NotFoundException("category not found")
        const newName = updateCategoryDto.name || oldCategory.name;
        category.name = newName ;
        category.slug = slugify(newName,{replacement:'_',lower:true,trim:true});
        category.logo = updateCategoryDto.logo || oldCategory.logo;
        category.updatedBy = user._id;

        return category;
    }


}