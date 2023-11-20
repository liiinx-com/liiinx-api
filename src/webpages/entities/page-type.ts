export enum PageType {
  LAYOUT = 'LAYOUT',
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  BIO = 'BIO',
}

export const getSlugByType = (type: PageType) => type.toLowerCase();
