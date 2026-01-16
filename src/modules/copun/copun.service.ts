import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCopunDto } from './dto/create-copun.dto';
import { UpdateCopunDto } from './dto/update-copun.dto';
import { Copun } from './entities/copun.entity';
import { CopunRepo } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class CopunService {
  constructor(private readonly copunRepo:CopunRepo){}
  async create(copun : Copun,user:any) {
    const copunExist = await this.copunRepo.getOne({code:copun.code})
    if(copunExist) throw new ConflictException("copun already exist and actvated")
    return await this.copunRepo.create(copun)
    

  }

  async applyCopun(copunCode:string,totalAmount:number,userId:Types.ObjectId){
    const copun = await this.copunRepo.getOne({code:copunCode,active:true})
    if(!copun) throw new ConflictException("copun not found")
    
    const now = new Date();
    if(now < new Date(copun.fromDate) || now > new Date(copun.toDate)) throw new ConflictException("copun expired")

    if(copun.assignTo && copun.assignTo.length > 0 ){
      const isAssignedTo = copun.assignTo.some(
        assigned => assigned.customerId.toString() === userId.toString()
      )

      if(!isAssignedTo) throw new ConflictException("copun not assigned to you")

      const userAssigment  = copun.assignTo.find(
        assigned => assigned.customerId.toString() === userId.toString()
      )
      if (!userAssigment) {
      throw new ConflictException("copun not assigned to you");
     }

      const userUsage = copun.usedBy.find(
        used => used.customerId.toString() === userId.toString()
      )

     if(userUsage && userUsage.count >= userAssigment.count) throw new ConflictException("copun usage limit exceeded")

    }

    let discount = 0 ;
    if(copun.discountType === "fixed_amount"){
      discount = copun.discountAmount
    }else if(copun.discountType === "percentage"){
      discount = (copun.discountAmount * totalAmount)/100
    }

    if(discount > totalAmount) discount = totalAmount

    await this.copunRepo.updateOne
    (
      {_id:copun._id},
      {
        $push:{usedBy:{customerId:userId,count:1}},
        $set:{active:false}
      }
    )
    return discount
  }


}
