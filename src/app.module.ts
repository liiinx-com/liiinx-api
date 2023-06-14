import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { ConfigurationService } from './configuration/configuration.service';
import { WebsitesModule } from './websites/websites.module';
import { WebpagesModule } from './webpages/webpages.module';
import { MenuModule } from './menu/menu.module';
import { SettingsModule } from './webpage-settings/settings.module';
import { ThemesModule } from './themes/themes.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BlockModule } from './webpage-blocks/blocks.module';
import { ProfileModule } from './profile/profile.module';
import { WebsiteDataModule } from './website-data/website-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        type: 'postgres',
        url: configService.getPostgresConfig().url,
        synchronize: true, // ! TODO: NOT IN PROD
        autoLoadEntities: true,
      }),
    }),
    ConfigurationModule,
    UsersModule,
    WebsitesModule,
    WebpagesModule,
    MenuModule,
    SettingsModule,
    ThemesModule,
    BlockModule,
    ProfileModule,
    WebsiteDataModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
