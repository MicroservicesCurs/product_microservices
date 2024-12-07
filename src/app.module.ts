import { Module } from "@nestjs/common";
import { PrductsModule } from './products/prducts.module';

@Module({
    imports:[PrductsModule]
})

export class AppModule {}