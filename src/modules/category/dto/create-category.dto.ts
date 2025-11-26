import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    name:string;
    
    logo:string;
}
