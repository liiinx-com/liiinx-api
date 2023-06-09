import { Module } from '@nestjs/common';
import { BlockService } from './blocks.service';
import { PageBlockMappingProfile } from './block.mapping-profile';
import { BlockController } from './block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBlock } from './entities/block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebpageBlock])],
  providers: [BlockService, PageBlockMappingProfile],
  controllers: [BlockController],
  exports: [BlockService],
})
export class BlockModule {}
