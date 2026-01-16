import { IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    name:string;

    @IsOptional()
    logo:string
}
