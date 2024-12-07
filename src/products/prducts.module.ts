import { Module } from '@nestjs/common';
import { PrductsService } from './prducts.service';
import { PrductsController } from './prducts.controller';

@Module({
  controllers: [PrductsController],
  providers: [PrductsService],
})
export class PrductsModule {}
