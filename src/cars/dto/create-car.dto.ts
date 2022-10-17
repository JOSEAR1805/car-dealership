import { IsString } from "class-validator";

export class CreateCarDto {
    
    @IsString({message: "The brand most "})
    readonly brand: string;

    @IsString()
    readonly model: string;
}