import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { CreateWebsiteDto } from './dto';
import { WebsitesService } from './websites.service';

@Injectable()
export class WebsitesSeederService {
  constructor(private websitesService: WebsitesService) {}

  async seed() {
    // Users
    // Pages
    // Demo Websites
  }
}
