import { AbstractRepo } from "@models/abstract.repository";
import { Product } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PopulateOptions, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";

export class ProductRepo extends AbstractRepo<Product> {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>){
        super(productModel)
    }
        async getAll(filter:RootFilterQuery<Product>,projection:ProjectionType<Product>={},options:QueryOptions={}){
            let query = this.productModel.find(filter,projection);
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