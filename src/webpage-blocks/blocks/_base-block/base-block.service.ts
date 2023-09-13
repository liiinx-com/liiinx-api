import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { WebpageBlock } from './base-block.entity';
import { BlockTemplateEntity } from './block-template.entity';
import { BLOCK_NOT_FOUND } from 'src/shared/error-codes';
import { lodash } from 'src/utils';

class NewBaseBlockParams {
  webpageId: string;
  blockType: string;
  blockVariant: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isArchived?: boolean;
  id?: string;
  isLtr?: boolean;
  order?: number;

  isContained?: boolean;
  blockClassName?: string;
  blockStyle?: object;
  isContainedWrapper?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: object;
}

@Injectable()
export class BaseBlockService {
  async saveBaseBlock(
    manager: EntityManager,
    baseBlock: WebpageBlock | Partial<WebpageBlock>,
  ): Promise<WebpageBlock> {
    return manager.getRepository(WebpageBlock).save(baseBlock);
  }

  async fetchOneByBlockIdOrException<T extends BlockTemplateEntity>(
    blockRepository: Repository<T>,
    id: string,
  ): Promise<[WebpageBlock, T]> {
    const { raw, entities } = await blockRepository
      .createQueryBuilder('blk')
      .innerJoinAndSelect(
        WebpageBlock,
        'base',
        'base.id::varchar = blk.base_block_id',
      )
      .where(
        `blk.id::varchar = '${id}' and base.is_deleted=false and base.is_archived=false and base.is_active=true`,
      )
      .getRawAndEntities();

    if (raw.length !== 1 || entities.length !== 1)
      throw new HttpException(BLOCK_NOT_FOUND, HttpStatus.BAD_REQUEST);

    const baseBlockEntity = this.extractWebpageBlockFromRawResult(raw[0]);
    const blockEntity = entities[0];

    return [baseBlockEntity, blockEntity];
  }

  private extractWebpageBlockFromRawResult(raw: unknown): WebpageBlock {
    const webBlockKeys = Object.keys(raw)
      .filter((k) => k.startsWith('base_'))
      .reduce((result, key) => {
        const cleanedKey = lodash.camelCase(key.replace('base_', ''));
        result[cleanedKey] = raw[key];
        return result;
      }, new NewBaseBlockParams());

    return this.buildNewBaseBlock(webBlockKeys);
  }

  mergeEntities(
    manager: EntityManager,
    mergeIntoEntity: WebpageBlock,
    partialEntity: Partial<WebpageBlock>,
  ) {
    manager.merge(WebpageBlock, mergeIntoEntity, partialEntity);
  }

  private buildNewBaseBlock({
    id,
    webpageId,
    blockType,
    blockVariant,
    isActive = false,
    isArchived = false,
    isDeleted = false,
    isLtr = true,
    isContained = true,
    blockClassName = '',
    blockStyle = {},
    order = 0,
    isContainedWrapper = true,
    wrapperClassName = '',
    wrapperStyle = {},
  }: NewBaseBlockParams): WebpageBlock {
    const result = new WebpageBlock();

    result.id = id;
    result.webpageId = webpageId;
    result.blockType = blockType;
    result.blockVariant = blockVariant;
    result.isActive = isActive;
    result.isArchived = isArchived;
    result.isDeleted = isDeleted;
    result.order = order;

    result.isLtr = isLtr;
    result.blockContained = isContained;
    result.blockClassName = blockClassName;
    result.blockStyle = blockStyle;

    result.wrapperContained = isContainedWrapper;
    result.wrapperClassName = wrapperClassName;
    result.wrapperStyle = wrapperStyle;

    return result;
  }
}
