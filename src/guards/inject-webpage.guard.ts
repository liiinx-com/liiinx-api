import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  WEBPAGE_ID_NOT_PROVIDED,
  WEBPAGE_NOT_FOUND,
} from 'src/shared/error-codes';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from 'src/websites/entities/website.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InjectWebpageGuard implements CanActivate {
  websiteRepository: Repository<Website>;
  webpageRepository: Repository<Webpage>;

  constructor(private dataSource: DataSource) {
    this.websiteRepository = this.dataSource.getRepository(Website);
    this.webpageRepository = this.dataSource.getRepository(Webpage);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers, method, body } = request;

    const webpageId =
      method === 'GET' ? headers['webpage-id'] : body['webpageId'];

    if (!webpageId)
      throw new HttpException(WEBPAGE_ID_NOT_PROVIDED, HttpStatus.NOT_FOUND);

    // check token sites if this is user's website
    // TODO: check website handle belongs to user

    const webpage = await this.webpageRepository.findOne({
      where: {
        id: webpageId,
        isDeleted: false,
      },
    });

    if (!webpage)
      throw new HttpException(WEBPAGE_NOT_FOUND, HttpStatus.NOT_FOUND);

    request.body['injectedWebpage'] = webpage;
    request['injectedWebpage'] = webpage;
    request.getWebpage = () => webpage;

    return true;
  }
}
