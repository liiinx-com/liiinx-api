import { Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto';
import { Website } from './entities/website.entity';

@Injectable()
export class WebsiteBuilder {
  createWebsiteEntity(ownerId: string, { handle }: CreateWebsiteDto) {
    const result = new Website();
    result.handle = handle;
    result.ownerId = ownerId;
    return result;
  }
}
