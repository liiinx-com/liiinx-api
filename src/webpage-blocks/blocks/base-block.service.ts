import { Injectable } from '@nestjs/common';
import { BaseBlockDto } from './base-block.dto';
import { transformAndValidate } from 'class-transformer-validator';
import { CreateHeaderBlockReq } from './header/header.dto';
import { BaseBlockEntity } from './base-block.entity';

// interface BlockService<T extends BaseBlockEntity> {
interface BlockService {
  validateBlocksOptions(blockDto: BaseBlockDto[]): Promise<BaseBlockDto[]>;
  //   mapToEntity(blocksDto: BaseBlockDto[]): T[];
  //   save(entities: T[]): Promise<T[]>;
}

const validators = {
  header: CreateHeaderBlockReq,
  baseBlock: BaseBlockDto,
};

@Injectable()
export class BaseBlockService implements BlockService {
  validateBlocksOptions(baseBlockDto: BaseBlockDto[]): Promise<BaseBlockDto[]> {
    return Promise.all<Promise<BaseBlockDto>>(
      baseBlockDto.map(async (blk) => {
        const validationResult = await transformAndValidate(
          validators[blk.blockType] ?? validators['baseBlock'],
          blk,
          {
            validator: { whitelist: true },
          },
        );
        return validationResult as BaseBlockDto;
      }),
    );
  }
}
