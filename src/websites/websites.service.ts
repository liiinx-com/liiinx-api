import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Website } from './entities/website.entity';
import { Repository } from 'typeorm';
import { CreateWebsiteDto as CreateWebsiteDto } from './dto';
import { WebsiteBuilder } from './website-builder';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private websitesRepository: Repository<Website>,
    private websiteBuilder: WebsiteBuilder,
  ) {}

  create(ownerId: string, websiteDto: CreateWebsiteDto): Promise<Website> {
    return this.websitesRepository.save(
      this.websiteBuilder.createWebsiteEntity(ownerId, websiteDto),
    );
  }

  findAll(): Promise<Website[]> {
    return this.websitesRepository.find();
  }

  getByHandle(handle: string): Promise<Website | null> {
    return this.websitesRepository.findOneBy({ handle });
  }
}
