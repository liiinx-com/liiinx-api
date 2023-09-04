import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Website } from './entities/website.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private websitesRepository: Repository<Website>,
  ) {}

  async save(website: Website): Promise<Website> {
    return this.websitesRepository.save(website);
  }

  async findAllByUser(id: string): Promise<Website[]> {
    return this.websitesRepository.find({
      where: {
        isDeleted: false,
        ownerId: id,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findAll(): Promise<Website[]> {
    return this.websitesRepository.find();
  }

  async getByHandle(handle: string): Promise<Website | null> {
    return this.websitesRepository.findOneBy({ handle });
  }
}
