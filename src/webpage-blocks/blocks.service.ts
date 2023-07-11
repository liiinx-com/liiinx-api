import { Injectable } from '@nestjs/common';
import { WebpageBlock } from './entities/block.entity';
import { lodash } from 'src/utils';
import {
  BaseBlockDto,
  BaseBlockOptions,
  CreateBlockDto,
  PageLayoutDto,
} from './blocks/base-block.dto';
import { transformAndValidate } from 'class-transformer-validator';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager, InsertResult, Repository } from 'typeorm';
import { HeaderBlockDto } from './blocks/header/header.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { BaseBlockEntity } from './blocks/base-block.entity';
import { HeaderBlockService } from './blocks/header/header.service';
import { IBlockService } from './blocks/iblock-service';

const validators = {
  header: HeaderBlockDto,
  baseBlock: BaseBlockDto,
};

@Injectable()
export class BlockService {
  blockRepository: Repository<WebpageBlock>;

  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly headerService: HeaderBlockService,
  ) {
    this.blockRepository = this.entityManager.getRepository(WebpageBlock);
  }

  async save(block: WebpageBlock): Promise<WebpageBlock> {
    return this.blockRepository.save(block);
  }

  validateBlocksOptions(baseBlockDto: BaseBlockDto[]): Promise<BaseBlockDto[]> {
    return Promise.all<Promise<BaseBlockDto>>(
      baseBlockDto.map(async (blk) => {
        const validatorClass = validators[blk.blockType];
        if (!validatorClass) throw new Error('UNSUPPORTED_BLOCK');
        const validationResult = await transformAndValidate(
          validatorClass,
          blk,
          {
            validator: { whitelist: true },
          },
        );
        return validationResult as BaseBlockDto;
      }),
    );
  }

  getBlockServiceByBlockType(
    blockType: string,
  ): IBlockService<BaseBlockEntity, BaseBlockOptions> {
    if (blockType === 'header') return this.headerService;
    throw new Error('UNSUPPORTED_BLOCK');
  }

  async saveBulk(blocks: WebpageBlock[]): Promise<InsertResult> {
    await this.entityManager.transaction(async (manager) => {
      const savedBaseBlocks = await manager.save<WebpageBlock>(blocks);
      return Promise.all(
        savedBaseBlocks.map(async (blk) => {
          blk.blockOptions.baseBlockId = blk.id;
          const service = this.getBlockServiceByBlockType(blk.blockType);
          return service.save(manager, blk.blockOptions);
        }),
      );
    });
    return null;
  }

  async addBlockDataArray(
    blockEntities: WebpageBlock[],
  ): Promise<BaseBlockDto[]> {
    return Promise.all(
      blockEntities.map(async (blk) => this.addBlockData(blk)),
    );
  }

  async addBlockData(blockEntity: WebpageBlock): Promise<BaseBlockDto> {
    const result = this.mapper.map(blockEntity, WebpageBlock, BaseBlockDto);

    const blkService = this.getBlockServiceByBlockType(blockEntity.blockType);
    result.blockOptions = await blkService.getDto(
      await blkService.getBlockByBaseBlockId(blockEntity.id),
    );
    return result;
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

  mapToBlock(createBlockDto: CreateBlockDto): WebpageBlock[] {
    return this.mapper
      .mapArray(createBlockDto.blocks, BaseBlockDto, WebpageBlock)
      .map((b) => {
        b.webpageId = createBlockDto.webpageId;
        return b;
      });
  }

  mapToBaseBlockDto(blocks: WebpageBlock[]): BaseBlockDto[] {
    return this.mapper.mapArray(blocks, WebpageBlock, BaseBlockDto);
  }

  getDefaultLayoutConfig() {
    const result: PageLayoutDto = {
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

      header: {
        blockContained: true,
        isActive: true,
        blockOptions: {},
        blockType: 'header',
        blockVariant: 'header2',
        wrapperContained: false,
      },
      hero: {
        blockContained: false,
        isActive: false,
        blockOptions: {},
        blockType: 'hero',
        blockVariant: 'hero1',
        wrapperContained: false,
      },
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

    return result;
  }

  async generatePageLayoutConfig_original(
    blocks: WebpageBlock[],
  ): Promise<PageLayoutDto> {
    const defaultLayoutBlocks: PageLayoutDto = this.getDefaultLayoutConfig();
    const enrichedBlocksDto = await this.addBlockDataArray(blocks);
    const blockKeysToOverride = Object.keys(defaultLayoutBlocks).filter(
      (value) => blocks.map((b) => b.blockType).includes(value),
    );
    const result = {
      ...defaultLayoutBlocks,
      ...enrichedBlocksDto.reduce(
        (acc: Partial<PageLayoutDto>, b: BaseBlockDto) => {
          if (!blockKeysToOverride.includes(b.blockType)) return acc;

          acc[b.blockType] = lodash.merge(
            defaultLayoutBlocks[
              Object.keys(defaultLayoutBlocks).find((k) => k === b.blockType)
            ],
            this.mapper.map(b, WebpageBlock, BaseBlockDto),
          );
          return acc;
        },
        new PageLayoutDto(),
      ),
    };

    return result;
  }

  async generatePageLayoutConfig(
    blocks: WebpageBlock[],
  ): Promise<PageLayoutDto> {
    const defaultLayoutBlocks: PageLayoutDto = {
      dir: 'ltr',
      faviconUrl: 'favicon.png',
    };
    const enrichedBlocksDto = await this.addBlockDataArray(blocks);

    const result = {
      ...defaultLayoutBlocks,
      ...enrichedBlocksDto.reduce(
        (acc: Partial<PageLayoutDto>, b: BaseBlockDto) => {
          acc[b.blockType] = enrichedBlocksDto.find(
            (k) => k.blockType === b.blockType,
          );
          return acc;
        },
        new PageLayoutDto(),
      ),
    };

    return result;
  }
}
