import {  BrandRepo } from "@models/index";
import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { Brand } from "../entities/brand.entity";
import slugify from "slugify";

@Injectable()
export class BrandFactoryService{
    constructor(private readonly brandRepo:BrandRepo){}
    createBrand(createBrandDTO:CreateBrandDto,user:any){
        const brand = new Brand()
            brand.name = createBrandDTO.name;
            brand.slug = slugify(createBrandDTO.name,{replacement:'_',lower:true,trim:true});
            brand.createdBy = user._id;
            brand.logo =  undefined;
            brand.updatedBy =user._id ;
            return brand;
        

    }

}