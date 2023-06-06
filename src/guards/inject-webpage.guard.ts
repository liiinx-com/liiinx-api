import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InjectWebpageGuard implements CanActivate {
  webpagesRepository: Repository<Webpage>;

  constructor(private dataSource: DataSource) {
    this.webpagesRepository = this.dataSource.getRepository(Webpage);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers, method, body } = request;

    const webpageId =
      method === 'GET' ? headers['webpage-id'] : body['webpageId'];
    if (!webpageId) return false;

    const webpage = await this.webpagesRepository.findOne({
      where: {
        id: webpageId,
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
