import { CreateCopunDto } from "../dto/create-copun.dto";
import { Copun } from "../entities/copun.entity";

export class copunFactoryService{
    createCopun(createCopunDto:CreateCopunDto , user:any){
        const copun = new Copun;

        copun.code = createCopunDto.code;
        copun.discountAmount = createCopunDto.discountAmount;
        copun.discountType = createCopunDto.discountType;
        copun.usedBy = [];
        copun.assignTo = createCopunDto.assignTo?.map((id)=>({
            customerId:id,
            count:0

        }))??[];
        copun.fromDate =  createCopunDto.fromDate;
        copun.toDate = createCopunDto.toDate;

        copun.createdBy = user._id;
        copun.updatedBy = user._id

        copun.active = createCopunDto.active;

        return copun; 

    }
}