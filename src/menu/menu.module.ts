import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuBuilder } from './menu-builder';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService, MenuBuilder],
  exports: [MenuService],
})
export class MenuModule {}
