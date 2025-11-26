import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepo } from "../abstract.repository";
import { Model } from "mongoose";
import { Customer } from "./customer.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerRepo extends AbstractRepo<Customer>{
    constructor (@InjectModel(Customer.name) private readonly customerModel : Model<Customer>){
        super(customerModel)
    }
}