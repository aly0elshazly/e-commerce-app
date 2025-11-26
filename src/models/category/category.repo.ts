import { AbstractRepo } from "@models/abstract.repository";
import { Category } from "./category.schema";
import { Model, PopulateOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export class CategoryRepo extends AbstractRepo<Category>{
    constructor(@InjectModel(Category.name) private readonly categoryModel:Model<Category>){
        super(categoryModel)
    }
    async getAll(filter:RootFilterQuery<Category>,projection:ProjectionType<Category>={},options:QueryOptions={}){
        let query = this.categoryModel.find(filter,projection);
        if(options.populate){
            const populateArray = Array.isArray(options.populate)? options.populate :[options.populate]
            query = query.populate(populateArray as (string | PopulateOptions)[])
        }
        if(options.limit) query = query.limit(options.limit);
        if(options.skip) query = query.skip(options.skip);
        if(options.sort) query = query.sort(options.sort)

        return query.exec();

    }
}