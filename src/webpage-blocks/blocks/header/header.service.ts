import { Injectable } from '@nestjs/common';
import { HeaderBlock } from './header.entity';
import { HeaderBlockOptions } from './header.dto';
import { BaseBlockService } from '../base-block.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HeaderBlockService extends BaseBlockService<
  HeaderBlock,
  HeaderBlockOptions
> {
  constructor(
    @InjectRepository(HeaderBlock)
    readonly repository: Repository<HeaderBlock>,
    @InjectMapper()
    readonly mapper: Mapper,
  ) {
    super(repository, mapper);
  }

  async mapToDto(block: HeaderBlock): Promise<HeaderBlockOptions> {
    return this.mapper.map(block, HeaderBlock, HeaderBlockOptions);
  }
  async mapToEntity(blockOptions: HeaderBlockOptions): Promise<HeaderBlock> {
    return this.mapper.map(blockOptions, HeaderBlockOptions, HeaderBlock);
  }
}
