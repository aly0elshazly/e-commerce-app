import { AbstractRepo } from "@models/abstract.repository";
import { Brand } from "./brand.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PopulateOptions, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";

export class BrandRepo extends AbstractRepo<Brand>{
    constructor(@InjectModel(Brand.name) private readonly categoryModel:Model<Brand>){
        super(categoryModel)
    }
    async getAll(filter:RootFilterQuery<Brand>,projection:ProjectionType<Brand>={},options:QueryOptions={}){
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