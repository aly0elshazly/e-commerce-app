import { DiscountType } from "@common/types";
import { UserCopun } from "@models/index";
import { Types } from "mongoose";

export class Copun { 
        readonly _id:Types.ObjectId;
    
        code:string;
    
        discountAmount:number;
    
        discountType:DiscountType;
    
        fromDate:Date;
    
        toDate:Date;
    
        active:boolean;
        
        usedBy?: UserCopun[];

        createdBy:Types.ObjectId;

        updatedBy:Types.ObjectId;
    
        assignTo?:UserCopun[]


}
