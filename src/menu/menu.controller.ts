import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMenuDto, MenuDto, MenuItemDto } from './dto/menu.dto';
import { WebpagesService } from 'src/webpages/webpages.service';
import { PageType } from 'src/webpages/entities/page-type';
import { MenuService } from './menu.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Menu } from './entities/menu.entity';

@Controller('menu')
export class MenuController {
  constructor(
    private webpageService: WebpagesService,
    @InjectMapper()
    private readonly mapper: Mapper,
    private menuService: MenuService,
  ) {}

  @Get(':webpageId/:menuType')
  async getPage(
    @Param('webpageId') webpageId: string,
    @Param('menuType') menuType: string,
  ) {
    const webpage = await this.webpageService.getById(webpageId);
    if (!webpage)
      throw new HttpException('WEBPAGE_NOT_FOUND', HttpStatus.NOT_FOUND);

    const menus = await this.menuService.getMenu(webpageId, [menuType]);
    if (!menus || menus.length !== 1)
      throw new HttpException('MENU_NOT_FOUND', HttpStatus.NOT_FOUND);

    const menu = menus[0];
    const result = this.mapper.map(menu, Menu, MenuDto);
    result.items = this.mapper.mapArray(menu.items, Menu, MenuItemDto);
    return menu;
  }

  @Post()
  async newMenu(@Body() menuDto: CreateMenuDto) {
    const webpage = await this.webpageService.getById(menuDto.webpageId);
    if (!webpage)
      throw new HttpException('WEBPAGE_NOT_FOUND', HttpStatus.NOT_FOUND);
    if (webpage.pageType !== PageType.LAYOUT)
      throw new HttpException(
        'SHOULD_BE_LAYOUT_PAGE_ONLY',
        HttpStatus.BAD_REQUEST,
      );

    await this.menuService.saveMenu(await this.menuService.mapToMenu(menuDto));
  }
}
