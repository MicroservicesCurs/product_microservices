import { Injectable, Logger, OnModuleInit  } from '@nestjs/common';
import { CreatePrductDto } from './dto/create-prduct.dto';
import { UpdatePrductDto } from './dto/update-prduct.dto';
import { PrismaClient } from '@prisma/client';
import { PAginationDto } from 'src/common/dto';

@Injectable()
export class PrductsService extends PrismaClient implements OnModuleInit {
  private readonly  lgger = new Logger('PrductsService')
   async onModuleInit() {
      
      await this.$connect();
      this.lgger.log("Db  😁")
   }


  create(createPrductDto: CreatePrductDto) {
    return this.product.create({
      data: createPrductDto
    });
  }

  async findAll(paginationDto: PAginationDto) {
    const { limit = 10, page = 1 } = paginationDto; // Valores predeterminados
    const totalProducts = await this.product.count({where:{avaliable:true}}); // Total de productos
    const totalPages = Math.ceil(totalProducts / limit); // Calcular páginas totales
  
    const data = await this.product.findMany({
      skip: (page - 1) * limit, // Productos a omitir
      take: limit, // Productos a tomar
      where:{avaliable:true}
    });
  
    return {
      data,
      meta: {
        page,
        totalPages,
      },
    };
  }

  async  findOne(id: number) {
   return   await  this.product.findUnique({
    where:{
      id:id,
      avaliable:true
    }
   })


  
  }

  async update(id: number, updatePrductDto: UpdatePrductDto) {
    const {id :___,...data} = updatePrductDto
    return await this.product.update({
       where:{
        id:id
       },
       data:data
    })  
  }

 async  remove(id: number) {


    return  this.product.update({
      where:{
        id:id
      },
      data:{
        avaliable:false
      }
    })
  }
}
