import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Website } from 'src/websites/entities/website.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InjectWebpageGuard implements CanActivate {
  websiteRepository: Repository<Website>;

  constructor(private dataSource: DataSource) {
    this.websiteRepository = this.dataSource.getRepository(Website);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers, method, body } = request;

    const handle = method === 'GET' ? headers['webpage-id'] : body['webpageId'];
    if (!handle) return false;

    // check token sites if this is user's website

    const webpage = await this.websiteRepository.findOne({
      where: {
        handle,
        isDeleted: false,
      },
    });
    if (!webpage) return false;

    request.body['injectedWebpage'] = webpage;
    request['injectedWebpage'] = webpage;
    request.getWebpage = () => webpage;

    return true;
  }
}
