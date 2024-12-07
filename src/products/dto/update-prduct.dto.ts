import { PartialType } from '@nestjs/mapped-types';
import { CreatePrductDto } from './create-prduct.dto';
import {IsString , MinLength , IsNumber , IsBoolean, IsPositive}  from "class-validator"

export class UpdatePrductDto extends PartialType(CreatePrductDto) {

    @IsNumber()
    @IsPositive()
    id:number

     
}
