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
import { MenuModule } from './menu/menu.module';
import { WebpageSettingsModule } from './webpage-settings/settings.module';
import { ThemesModule } from './themes/themes.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

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
    WebpageSettingsModule,
    ThemesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
