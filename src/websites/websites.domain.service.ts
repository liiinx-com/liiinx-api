import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { CreateWebsiteDto } from './dto';
import { WebsitesService } from './websites.service';

@Injectable()
export class WebsitesDomainService {
  constructor(private websitesService: WebsitesService) {}

  // TODO: make it transactional
  async createNewWebsite(
    ownerId: string,
    websiteDto: CreateWebsiteDto,
  ): Promise<Website> {
    const { handle } = websiteDto;

    if (await this.websitesService.getByHandle(handle)) {
      throw new HttpException('ALREADY_EXIST', HttpStatus.CONFLICT);
    }

    const saveWebsite = await this.websitesService.create(ownerId, websiteDto);

    // 3. Add Pages

    // 4. toDto
    return saveWebsite;
  }
}
