import { Type } from "class-transformer"
import {IsString , MinLength , IsNumber , IsBoolean, IsPositive, Min, IsEmpty}  from "class-validator"
export class CreatePrductDto {
     
    @IsString()
    @MinLength(1)
    public  name:string
    @IsNumber({
         maxDecimalPlaces:4
    })

    @Min(1)
    @Type(()=>Number)
    public price:number
}
