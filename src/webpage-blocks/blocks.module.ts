import { Module } from '@nestjs/common';
import { BlockService } from './blocks.service';
import { PageBlockMappingProfile } from './block.mapping-profile';
import { BlockController } from './block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBlock } from './entities/block.entity';
import { HeaderBlock } from './blocks/header/header.entity';
import { HeaderBlockService } from './blocks/header/header.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebpageBlock, HeaderBlock])],
  providers: [BlockService, PageBlockMappingProfile, HeaderBlockService],
  controllers: [BlockController],
  exports: [BlockService],
})
export class BlockModule {}
