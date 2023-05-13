import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { ConfigurationService } from './configuration/configuration.service';
import { WebsitesModule } from './websites/websites.module';
import { WebpagesModule } from './webpages/webpages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        type: 'postgres',
        url: configService.getPostgresConfig().url,
        synchronize: true, // ! TODO: NO PROD,
        autoLoadEntities: true,
      }),
    }),
    ConfigurationModule,
    UsersModule,
    WebsitesModule,
    WebpagesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
