import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminRepo, adminSchema, Customer, CustomerRepo, customerSchema, Seller, SellerRepo, sellerSchema, User, UserRepo, userSchema } from "src/models";

@Module(
    {
        imports : [
            MongooseModule.forFeature([
              {
                name:User.name,
                schema:userSchema,
                discriminators:[
                {name:Seller.name,schema:sellerSchema},
                {name:Admin.name,schema:adminSchema},
                {name:Customer.name,schema:customerSchema}]
              }
            ])
          ],
        controllers:[],
        providers:[AdminRepo,CustomerRepo,SellerRepo,UserRepo],
        exports:[AdminRepo,CustomerRepo,SellerRepo,UserRepo]

    }
)
export class UserMongoMoule{}