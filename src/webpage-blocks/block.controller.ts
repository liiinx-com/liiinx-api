import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BlockService } from './blocks.service';
import { lodash } from 'src/utils';
import { InjectWebpageGuard } from 'src/guards/inject-webpage.guard';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { CreateBlockDto } from './blocks/base-block.dto';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get('page/:webpageId')
  @UseGuards(InjectWebpageGuard)
  async getPageBlocks(@Request() req: any) {
    const webpage: Webpage = req.getWebpage();
    return this.blockService.addBlockData(
      await this.blockService.find(webpage.id),
    );
  }

  @Get('page/:webpageId/:blockType')
  @UseGuards(InjectWebpageGuard)
  async getPageBlocksByType(
    @Request() req: any,
    @Param('blockType') blockType: string,
  ) {
    const webpage: Webpage = req.getWebpage();
    return this.blockService.mapToBlockDto(
      await this.blockService.find(webpage.id, blockType),
    );
  }

  @UseGuards(InjectWebpageGuard)
  @Post()
  async newBlocks(@Body() createBlockDto: CreateBlockDto) {
    createBlockDto.blocks = lodash.orderBy(createBlockDto.blocks, ['order']);

    try {
      createBlockDto.blocks = await this.blockService.validateBlocksOptions(
        createBlockDto.blocks,
      );
      await this.blockService.saveBulk(
        this.blockService.mapToBlock(createBlockDto),
      );
    } catch (error) {
      console.error(error);
      throw new HttpException('INVALID_BLOCK_DATA', HttpStatus.BAD_REQUEST);
    }
  }
}
