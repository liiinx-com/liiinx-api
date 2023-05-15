import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Website } from './entities/website.entity';
import { Repository } from 'typeorm';
import { CreateWebsiteDto } from './dto';
import { WebsiteBuilder } from './website-builder';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private websitesRepository: Repository<Website>,
  ) {}

  async save(website: Website): Promise<Website> {
    return this.websitesRepository.save(website);
  }

  async findAll(): Promise<Website[]> {
    return this.websitesRepository.find();
  }

  async getByHandle(handle: string): Promise<Website | null> {
    return this.websitesRepository.findOneBy({ handle });
  }
}
