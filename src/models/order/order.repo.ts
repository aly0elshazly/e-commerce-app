import { AbstractRepo } from "@models/abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./order.schema";

export class OrderRepo extends AbstractRepo<Order>{
    constructor(@InjectModel(Order.name) private readonly orderModel:Model<Order>){
        super(orderModel)
    }
}