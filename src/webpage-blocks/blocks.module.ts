import { Module } from '@nestjs/common';
import { BlockService } from './blocks.service';
import { BlockController } from './blocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBlock } from './blocks/_base-block/base-block.entity';
import { HeaderBlockEntity } from './blocks/header/header.entity';
import { HeaderService } from './blocks/header/header.service';
import { FooterService } from './blocks/footer/footer.service';
import { BaseBlockService } from './blocks/_base-block/base-block.service';
import { HeaderBlockMappingProfile } from './blocks/header/header.mapping.profile';

@Module({
  imports: [TypeOrmModule.forFeature([WebpageBlock, HeaderBlockEntity])],
  providers: [
    BlockService,
    BaseBlockService,
    HeaderBlockMappingProfile,
    HeaderService,
    FooterService,
  ],
  controllers: [BlockController],
  exports: [BlockService, HeaderService],
})
export class BlockModule {}
