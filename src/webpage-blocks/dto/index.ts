import { AutoMap } from '@automapper/classes';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { BlockDto } from './block';
import { HeaderBlockDto } from './header';

export * from './block';
export * from './header';

export class CreateBlockDto {
  @AutoMap()
  @IsUUID()
  webpageId: string;

  @AutoMap()
  injectedWebpage: Webpage;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  blocks: BlockDto[];
}

export class PageLayoutDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  topBar?: BlockDto;
  header?: HeaderBlockDto;
  // hero?: LayoutBlock;
  sidebar?: BlockDto;
  content?: BlockDto;
  footer?: BlockDto;
  footerBar?: BlockDto;
}
