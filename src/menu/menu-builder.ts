import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';

interface IMenuBuilder {
  reset: () => IMenuBuilder;
  getMenu: () => Menu;
  withUrl: (url: string) => IMenuBuilder;
  withTitle: (title: string) => IMenuBuilder;
  withIcon: (icon: string) => IMenuBuilder;
  makeParent: () => IMenuBuilder;
  withChild: (child: Menu) => IMenuBuilder;
  makeFeatured: () => IMenuBuilder;
  withUiProps: (props: object) => IMenuBuilder;
  withOrder: (order: number) => IMenuBuilder;
}

@Injectable()
export class MenuBuilder implements IMenuBuilder {
  menu: Menu;

  getMenu() {
    return this.menu;
  }

  reset() {
    this.menu = new Menu();
    this.menu.isFeatured = false;
    this.menu.target = '_blank';
    this.menu.isParent = false;

    return this;
  }

  withChild(child: Menu) {
    this.menu.items.push(child);
    return this;
  }

  withUrl(url: string) {
    this.menu.url = url;
    return this;
  }

  withTitle(title: string) {
    this.menu.title = title;
    return this;
  }

  withIcon(icon: string) {
    this.menu.icon = icon;
    return this;
  }

  makeParent() {
    this.menu.isParent = true;
    return this;
  }

  makeFeatured() {
    this.menu.isFeatured = true;
    return this;
  }

  withUiProps(props: object) {
    this.menu.uiProps = props;
    return this;
  }

  withOrder(order: number) {
    this.menu.order = order;
    return this;
  }
}
