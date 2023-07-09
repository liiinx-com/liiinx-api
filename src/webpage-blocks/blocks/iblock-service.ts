import { EntityManager } from 'typeorm';
import { BaseBlockOptions } from './base-block.dto';
import { BaseBlockEntity } from './base-block.entity';

export interface IBlockService<
  T extends BaseBlockEntity,
  S extends BaseBlockOptions,
> {
  addDynamicOptionsToDto(blockDto: S): Promise<S>;
  addDefaultOptionsToEntity(blockEntity: T): Promise<T>;

  getBlockByBaseBlockId(baseBlockId: string): Promise<BaseBlockEntity>;

  mapToDto(block: T): Promise<S>;
  mapToEntity(blockOptions: S): Promise<T>;
  getDto(blockEntity: T): Promise<S>;
  getEntity(blockOptions: S): Promise<T>;

  save(manager: EntityManager, blockOptions: S): Promise<T>;
}
