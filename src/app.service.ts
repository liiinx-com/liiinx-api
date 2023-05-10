import { Injectable } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { ApiInfo } from './configuration/configuration.interface';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigurationService) {}

  async getApiInfo(): Promise<ApiInfo> {
    return this.configService.getApiInfo();
  }
}
