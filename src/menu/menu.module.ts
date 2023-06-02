import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuBuilder } from './menu-builder';
import { MenuMappingProfile } from './menu.mapping-profile';
import { MenuController } from './menu.controller';
import { WebpagesModule } from 'src/webpages/webpages.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), WebpagesModule],
  controllers: [MenuController],
  providers: [MenuService, MenuBuilder, MenuMappingProfile],
  exports: [MenuService],
})
export class MenuModule {}
