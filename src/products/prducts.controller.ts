import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe ,Res , HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { PrductsService } from './prducts.service';
import { CreatePrductDto } from './dto/create-prduct.dto';
import { UpdatePrductDto } from './dto/update-prduct.dto';
import { Response } from 'express';

import { PAginationDto } from 'src/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('prducts')
export class PrductsController {
  constructor(private readonly prductsService: PrductsService) {}
 
  //@Post()
  @MessagePattern({cmd:'create_product'})
  async create(@Payload() createPrductDto: CreatePrductDto , @Res() res:Response) {
    try {
     const data   = await  this.prductsService.create(createPrductDto) 
     if(data){
      return res.status(HttpStatus.ACCEPTED).json({
        message:"datos creado con exito",
        data:data
      })
     }
     throw new Error("Error en la consulta")
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST ).json({errr:error.message})
      
    }
  }

  //@Get()
  @MessagePattern({cmd:'find_all_product'})
  async findAll(@Payload() paginationDto: PAginationDto, @Res() res: Response) {
    try {
      const data = await this.prductsService.findAll(paginationDto);
  
      if (data.data.length > 0) {
        return res.status(HttpStatus.ACCEPTED).json({
          message: "Datos obtenidos con éxito",
          meta: data.meta,
          products: data.data,
        });
      }
  
      return res.status(HttpStatus.NO_CONTENT).json({
        message: "No se encontraron productos",
        meta: data.meta,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.message,
      });
    }
  }

  //@Get(':id')

  @MessagePattern({cmd:'find_one_product'})
  
 async findOne(@Payload('id' , ParseIntPipe) id: number , @Res() res:Response) {
 try {
  const data =   await this.prductsService.findOne(id)
  if(data){
     return  res.status(HttpStatus.ACCEPTED).json({message:"operacion exitos" , data:data})
  }
  return res.status(HttpStatus.OK).json({data:data == null ? [] : data})
 } catch (error) {
   res.status(HttpStatus.BAD_REQUEST).json({errr:error.message})
 }
  }

  //@Patch(':id')
  @MessagePattern({cmd:'update_product'})

   async update(
    
  //@Param('id') id: string, @Body() updatePrductDto: UpdatePrductDto
  @Payload() updateProduct:UpdatePrductDto
  ) {
    return this.prductsService.update(updateProduct.id , updateProduct);
  }

  //@Delete(':id')
  @MessagePattern({cmd:'delete_product'})

  async remove(@Payload('id' , ParseIntPipe) id: number , @Res() res:Response) {
    try {
    const elemet = await this.prductsService.remove(+id)
    return res.status(HttpStatus.OK).json({message:"prdcuto removido con exito " ,data:elemet})
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message:error.message})
    }
  }
}
