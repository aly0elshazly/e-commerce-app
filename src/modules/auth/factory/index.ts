import { generateOTP } from "@common/index";
import { RegisterDTO } from "../dto/create-auth.dto";
import { Customer } from "../entities/auth.entity";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthFactoryService { 
    async createCustomer (registerDTO : RegisterDTO){
        const customer = new Customer()
        customer.email = registerDTO.email;
        customer.userName = registerDTO.userName;
        customer.password = await bcrypt.hash(registerDTO.password,10);
        customer.otp = generateOTP() as unknown as string;
        customer.otpExpiry =  new Date(Date.now() + 5 * 60 *1000);
        customer.isVerified = false ;
        customer.dob  = new Date(registerDTO.dob);
        return customer
    }
}