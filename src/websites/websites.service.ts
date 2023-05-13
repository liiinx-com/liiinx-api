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
    private websiteBuilder: WebsiteBuilder,
  ) {}

  async create(
    ownerId: string,
    websiteDto: CreateWebsiteDto,
  ): Promise<Website> {
    const { handle } = websiteDto;
    if (await this.getByHandle(handle)) {
      throw new HttpException('ALREADY_EXIST', HttpStatus.CONFLICT);
    }
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
