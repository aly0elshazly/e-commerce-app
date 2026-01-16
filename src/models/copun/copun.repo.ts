import { AbstractRepo } from "@models/abstract.repository";
import { Model, PopulateOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Copun } from "./copun.schema";

export class CopunRepo extends AbstractRepo<Copun>{
    constructor(@InjectModel(Copun.name) private readonly copunModel:Model<Copun>){
        super(copunModel)
    }
    
}