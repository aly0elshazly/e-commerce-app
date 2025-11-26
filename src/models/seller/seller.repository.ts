import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepo } from "../abstract.repository";
import { Seller } from "./seller.schema";
import { Model } from "mongoose";

export class SellerRepo extends AbstractRepo<Seller>{
    constructor (@InjectModel(Seller.name) sellerModel : Model<Seller>){
        super(sellerModel)
    }
}