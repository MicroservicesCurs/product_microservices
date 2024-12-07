import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport , MicroserviceOptions } from "@nestjs/microservices"
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { env } from 'process';


async function bootstrap() {
  
   const logger = new Logger('Main')

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport:Transport.TCP,
      options:{
        port: envs.port
      }
    }
  );
  

 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas en los DTO
      forbidNonWhitelisted: true, // Genera error si se envían propiedades no declaradas
      transform: true, // Convierte tipos de datos automáticamente
    }),
  );

 await app.listen()
 logger.log("Micorservicio prducts en el puerto" + envs.port)
}

bootstrap();
