import { AbstractRepo } from "@models/abstract.repository";
import { Model, PopulateOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Cart } from "./cart.schema";

export class CartRepo extends AbstractRepo<Cart>{
    constructor(@InjectModel(Cart.name) private readonly cartModel:Model<Cart>){
        super(cartModel)
    }
}
