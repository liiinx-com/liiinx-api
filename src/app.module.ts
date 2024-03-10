import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { ConfigurationService } from './configuration/configuration.service';
import { WebsitesModule } from './websites/websites.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { NewWebsitesModule } from './websites/new-website/new-website.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
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
    AuthModule,
    UsersModule,
    WebsitesModule,
    WebhooksModule,
    // WebpagesModule,
    // MenuModule,
    // SettingsModule,
    // ThemesModule,
    // BlockModule,
    // ProfileModule,
    // MediaModule,
    // ! API V2
    NewWebsitesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
