import { Injectable } from '@nestjs/common';
import { WebpageBlock } from './entities/block.entity';
import { lodash } from 'src/utils';
import {
  BlockDto,
  BlockProps,
  CreateBlockDto,
  HeaderBlockDto,
  PageLayoutDto,
} from './dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { DataSource, InsertResult, Repository } from 'typeorm';

@Injectable()
export class BlockService {
  blockRepository: Repository<WebpageBlock>;

  constructor(
    private dataSource: DataSource,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    this.blockRepository = this.dataSource.getRepository(WebpageBlock);
  }

  async save(block: WebpageBlock): Promise<WebpageBlock> {
    return this.blockRepository.save(block);
  }

  async saveBulk(blocks: WebpageBlock[]): Promise<InsertResult> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(WebpageBlock)
      .values(blocks)
      .execute();
  }

  async find(webpageId: string, blockType?: string): Promise<WebpageBlock[]> {
    return this.blockRepository.find({
      where: {
        webpageId,
        isDeleted: false,
        ...(blockType ? { blockType } : {}),
      },
      order: {
        order: 'ASC',
      },
    });
  }

  async createBlock(
    blockType: string,
    blockVariant: string,
    blockProps?: BlockProps,
    order = 1,
  ): Promise<WebpageBlock> {
    const result = new WebpageBlock();
    result.order = order;
    result.blockType = blockType;
    result.blockVariant = blockVariant;
    result.blockProps = blockProps;
    return result;
  }

  // when creating webpage-dto
  // async addDynamicLayoutSections(): Promise<GenericBlockDto[]> {
  //   // TODO: replace with needed dynamic sections
  //   return [];
  // }

  //when inserting new website
  // async getDefaultLayoutSections(): Promise<WebpageBlock[]> {
  //   return Promise.all([
  //     this.createSection(
  //       SectionKeys.HERO,
  //       'hero1',
  //       new HeroPropsBuilder()
  //         .create()
  //         .withItem(
  //           new HeroItemBuilder()
  //             .create()
  //             .withTitle('Welcome to my website')
  //             .withMedia(
  //               'image',
  //               'https://www.leadengine-wp.com/wp-content/uploads/sites/37/2018/02/startup1.jpg',
  //             )
  //             .getItem(),
  //         )
  //         .getProps(),
  //     ),
  //   ]);
  // }

  mapToBlock(createBlockDto: CreateBlockDto): WebpageBlock[] {
    return this.mapper
      .mapArray(createBlockDto.blocks, BlockDto, WebpageBlock)
      .map((b) => {
        b.webpageId = createBlockDto.webpageId;
        return b;
      });
  }

  mapToPageLayoutDto(blocks: WebpageBlock[]): PageLayoutDto {
    console.log('---`', blocks);
    return null;
  }

  mapToBlockDto(blocks: WebpageBlock[]): BlockDto[] {
    return this.mapper.mapArray(blocks, WebpageBlock, BlockDto);
  }

  // used in dto builder to merge default layout settings with page overrides
  generatePageLayoutConfig(blocks: WebpageBlock[]): PageLayoutDto {
    const defaultSettings: PageLayoutDto = {
      dir: 'ltr',
      faviconUrl: 'favicon.png',

      topBar: {
        blockContained: true,
        isActive: false,
        blockProps: {},
        blockType: 'topbar',
        blockVariant: 'topbar1',
        wrapperContained: false,
      },
      header: {
        blockContained: true,
        isActive: true,
        blockProps: {
          dir: 'ltr',
          style: {
            backgroundColor: 'transparent',
          },
        },
        blockType: 'header',
        blockVariant: 'header1',
        wrapperContained: false,
      },
      // hero: {
      //   contained: false,
      //   isActive: false,
      //   blockProps: {},
      //   blockType: 'hero',
      //   blockVariant: 'hero1',
      //   wrapper: {
      //     contained: false,
      //   },
      // },
      content: {
        blockContained: true,
        isActive: true,
        blockType: 'content',
        blockProps: {},
        blockVariant: 'content1',
        wrapperContained: false,
      },
      footer: {
        blockContained: true,
        isActive: true,
        blockType: 'footer',
        blockProps: {},
        blockVariant: 'footer1',
        wrapperContained: false,
      },
      footerBar: {
        blockContained: true,
        blockType: 'footerBar',
        blockVariant: 'footerBar1',
        isActive: false,
        blockProps: {},
        wrapperContained: false,
      },
    };

    const blockKeysToOverride = Object.keys(defaultSettings).filter((value) =>
      blocks.map((b) => b.blockType).includes(value),
    );

    const result = {
      ...defaultSettings,
      ...blocks.reduce((acc: Partial<PageLayoutDto>, b: WebpageBlock) => {
        if (!blockKeysToOverride.includes(b.blockType)) return acc;

        // acc[b.blockType] = this.mapper.map(b, WebpageBlock, BlockDto);
        acc[b.blockType] = lodash.merge(
          defaultSettings[
            Object.keys(defaultSettings).find((k) => k === b.blockType)
          ],
          this.mapper.map(b, WebpageBlock, BlockDto),
        );
        return acc;
      }, new PageLayoutDto()),
    };

    return result;
  }
}
