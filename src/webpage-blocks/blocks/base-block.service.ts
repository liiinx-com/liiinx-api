import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { IBlockService } from './iblock-service';
import { BaseBlockEntity } from './base-block.entity';

@Injectable()
export abstract class BaseBlockService<
  BlockEntity extends BaseBlockEntity,
  BlockOptions,
> implements IBlockService<BlockEntity, BlockOptions>
{
  constructor(
    readonly repository: Repository<BaseBlockEntity>,
    readonly mapper: Mapper,
  ) {}

  async addDynamicOptionsToDto(blockDto: BlockOptions): Promise<BlockOptions> {
    return blockDto;
  }

  abstract mapToDto(block: BlockEntity): Promise<BlockOptions>;
  abstract mapToEntity(blockOptions: BlockOptions): Promise<BlockEntity>;

  async getDto(blockEntity: BlockEntity): Promise<BlockOptions> {
    return this.addDynamicOptionsToDto(await this.mapToDto(blockEntity));
  }

  async getEntity(blockOptions: BlockOptions): Promise<BlockEntity> {
    return this.addDefaultOptionsToEntity(await this.mapToEntity(blockOptions));
  }

  getBlockByBaseBlockId(baseBlockId: string): Promise<BaseBlockEntity> {
    return this.repository.findOneByOrFail({ baseBlockId });
  }

  async addDefaultOptionsToEntity(
    blockEntity: BlockEntity,
  ): Promise<BlockEntity> {
    return blockEntity;
  }

  async save(
    manager: EntityManager,
    blockOptions: BlockOptions,
  ): Promise<BlockEntity> {
    return manager.save<BlockEntity>(await this.getEntity(blockOptions));
  }
}
