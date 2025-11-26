import { AbstractRepo } from "@models/abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.shema";

export class UserRepo extends AbstractRepo<User>{
    constructor(@InjectModel(User.name) private readonly userModel:Model<User>){
        super(userModel)
    }
}