import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiInfo,
  GoogleOAuthConfig,
  JWTConfig,
  MailConfig,
  PostgresConfig,
  RedisConfig,
  WooCommerceConfig,
} from './configuration.interface';
import {
  API_NAME,
  API_VERSION,
  REDIS_URL,
  POSTGRES_URL,
  JWT_CONFIG,
  MAIL_CONFIG,
  WOO_COMMERCE_CONFIG,
} from './constants';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  getApiInfo(): ApiInfo {
    return {
      name: this.configService.get<string>(API_NAME),
      version: this.configService.get<string>(API_VERSION),
    };
  }

  getRedisConfig(): RedisConfig {
    return { url: this.configService.get<string>(REDIS_URL) };
  }

  getPostgresConfig(): PostgresConfig {
    return { url: this.configService.get<string>(POSTGRES_URL) };
  }

  getJWTConfig(): JWTConfig {
    return {
      secret: this.configService.get<string>(JWT_CONFIG.SECRET),
      expiresIn: this.configService.get<string>(JWT_CONFIG.EXPIRES_IN),
    };
  }

  getMailConfig(): MailConfig {
    return {
      host: this.configService.get<string>(MAIL_CONFIG.HOST),
      password: this.configService.get<string>(MAIL_CONFIG.PASSWORD),
      username: this.configService.get<string>(MAIL_CONFIG.USERNAME),
      defaultSender: this.configService.get<string>(MAIL_CONFIG.DEFAULT_SENDER),
    };
  }

  getWooCommerceConfig(): WooCommerceConfig {
    return {
      url: this.configService.get<string>(WOO_COMMERCE_CONFIG.URL),
      key: this.configService.get<string>(WOO_COMMERCE_CONFIG.KEY),
      secret: this.configService.get<string>(WOO_COMMERCE_CONFIG.SECRET),
      version: null, // is set in WooCommerceService
    };
  }
}
