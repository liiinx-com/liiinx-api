import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { MenuBuilder } from './menu-builder';

@Injectable()
export class MenuService {
  menuRepository: Repository<Menu>;

  constructor(private dataSource: DataSource) {
    this.menuRepository = this.dataSource.getRepository(Menu);
  }

  async saveMenu(menu: Menu): Promise<Menu> {
    return this.menuRepository.save(menu);
  }

  async saveMenuBulk(items: Menu[]): Promise<InsertResult> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Menu)
      .values(items)
      .execute();
  }

  getMenu(id: string): Promise<Menu> {
    return this.menuRepository.findOne({
      relations: { items: true },
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async getMenusByTemplate(templateName: string): Promise<Menu[]> {
    const headerPrimaryMenu = new MenuBuilder()
      .create('HEADER_PRIMARY', null)
      .makeParent()
      .withTitle('Header Primary Menu')
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(1)
          .withTitle('Home')
          .withUrl('/home')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(2)
          .withTitle('About')
          .withUrl('/about')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(3)
          .withTitle('Videos')
          .withUrl('/videos')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Blog')
          .withUrl('/blog')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Contact')
          .withUrl('/contact')
          .getMenu(),
      )
      .getMenu();

    const footerPrimaryMenu = new MenuBuilder()
      .create('FOOTER_PRIMARY', null)
      .makeParent()
      .withTitle('Footer Primary Menu')
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(1)
          .withTitle('Home')
          .withUrl('/home')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(2)
          .withTitle('About')
          .withUrl('/about')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(3)
          .withTitle('Videos')
          .withUrl('/videos')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Blog')
          .withUrl('/blog')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Contact')
          .withUrl('/contact')
          .getMenu(),
      )
      .getMenu();

    return [headerPrimaryMenu, footerPrimaryMenu];
  }
}
