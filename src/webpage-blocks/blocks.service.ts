import { Injectable } from '@nestjs/common';
import { WebpageBlock } from './entities/block.entity';
import { lodash } from 'src/utils';
import {
  BaseBlockDto,
  BaseBlockOptions,
  CreateBlockDto,
  PageLayoutDto,
} from './blocks/base-block.dto';
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

  // async createBlock(
  //   blockType: string,
  //   blockVariant: string,
  //   blockProps?: BaseBlockOptions,
  //   order = 1,
  // ): Promise<WebpageBlock> {
  //   const result = new WebpageBlock();
  //   result.order = order;
  //   result.blockType = blockType;
  //   result.blockVariant = blockVariant;
  //   result.blockOptions = blockProps;
  //   return result;
  // }

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
      .mapArray(createBlockDto.blocks, BaseBlockDto, WebpageBlock)
      .map((b) => {
        b.webpageId = createBlockDto.webpageId;
        return b;
      });
  }

  mapToPageLayoutDto(blocks: WebpageBlock[]): PageLayoutDto {
    console.log('---`', blocks);
    return null;
  }

  mapToBlockDto(blocks: WebpageBlock[]): BaseBlockDto[] {
    return this.mapper.mapArray(blocks, WebpageBlock, BaseBlockDto);
  }

  // used in dto builder to merge default layout settings with page overrides
  generatePageLayoutConfig(blocks: WebpageBlock[]): PageLayoutDto {
    const defaultLayoutBlocks: PageLayoutDto = {
      dir: 'ltr',
      faviconUrl: 'favicon.png',

      topBar: {
        blockContained: true,
        isActive: false,
        blockOptions: {},
        blockType: 'topbar',
        blockVariant: 'topbar1',
        wrapperContained: false,
      },
      // header: {
      //   blockContained: true,
      //   isActive: true,
      //   blockOptions: {
      //     dir: 'ltr',
      //   },
      //   blockType: 'header',
      //   blockVariant: 'header1',
      //   wrapperContained: false,
      // },
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
        blockOptions: {},
        blockVariant: 'content1',
        wrapperContained: false,
      },
      footer: {
        blockContained: true,
        isActive: true,
        blockType: 'footer',
        blockOptions: {},
        blockVariant: 'footer1',
        wrapperContained: false,
      },
      footerBar: {
        blockContained: true,
        blockType: 'footerBar',
        blockVariant: 'footerBar1',
        isActive: false,
        blockOptions: {},
        wrapperContained: false,
      },
    };

    const blockKeysToOverride = Object.keys(defaultLayoutBlocks).filter(
      (value) => blocks.map((b) => b.blockType).includes(value),
    );

    const result = {
      ...defaultLayoutBlocks,
      ...blocks.reduce((acc: Partial<PageLayoutDto>, b: WebpageBlock) => {
        if (!blockKeysToOverride.includes(b.blockType)) return acc;

        // acc[b.blockType] = this.mapper.map(b, WebpageBlock, BlockDto);
        acc[b.blockType] = lodash.merge(
          defaultLayoutBlocks[
            Object.keys(defaultLayoutBlocks).find((k) => k === b.blockType)
          ],
          this.mapper.map(b, WebpageBlock, BaseBlockDto),
        );
        return acc;
      }, new PageLayoutDto()),
    };

    return result;
  }
}
