import { Module } from '@nestjs/common';
import { BlockService } from './blocks.service';
import { PageBlockMappingProfile } from './blocks.mapping-profile';
import { BlockController } from './blocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBlock } from './base-block/base-block.entity';
import { HeaderBlockEntity } from './blocks/header/header.entity';
import { HeaderService } from './blocks/header/header.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebpageBlock, HeaderBlockEntity])],
  providers: [BlockService, PageBlockMappingProfile, HeaderService],
  controllers: [BlockController],
  exports: [BlockService],
})
export class BlockModule {}
