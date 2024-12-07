import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProductsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
     return Number(value)
  }
}
