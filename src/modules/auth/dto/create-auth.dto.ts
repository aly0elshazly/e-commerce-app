import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, isNotEmpty, IsString, MaxLength, MinLength, minLength } from "class-validator";

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    userName : string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @Transform(({value})=>{
        let date = new Date()
        return date 
    })
    @IsDate()
    dob:string
    
}
