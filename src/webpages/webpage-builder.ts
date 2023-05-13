import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { WebPage } from './entities/webpage.entity';
import { CreateWebPageParams } from './types';

@Injectable()
export class WebpageBuilder {
  createWebpageEntity(params: CreateWebPageParams): WebPage {
    return plainToClass(WebPage, params);
  }
}
