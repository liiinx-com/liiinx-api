import { Injectable } from '@nestjs/common';
import { WebPage } from './entities/webpage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WebpageBuilder } from './webpage-builder';
import { CreateWebPageParams } from './types';

@Injectable()
export class WebpagesService {
  constructor(
    @InjectRepository(WebPage) private webpagesRepository: Repository<WebPage>,
    private readonly webpageBuilder: WebpageBuilder,
  ) {}

  async create(webpageDto: CreateWebPageParams): Promise<WebPage> {
    return this.webpagesRepository.save(
      this.webpageBuilder.createWebpageEntity(webpageDto),
    );
  }
}
