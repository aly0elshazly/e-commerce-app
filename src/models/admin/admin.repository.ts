import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepo } from "../abstract.repository";
import { Model } from "mongoose";
import { Admin } from "./admin.schema";

export class AdminRepo extends AbstractRepo<Admin>{
    constructor (@InjectModel(Admin.name) adminModel : Model<Admin>){
        super(adminModel)
    }
}