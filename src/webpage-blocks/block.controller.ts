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
import { BlockDto, CreateBlockDto, HeaderBlockDto } from './dto';
import { transformAndValidate } from 'class-transformer-validator';
import { BlockService } from './blocks.service';
import { lodash } from 'src/utils';
import { InjectWebpageGuard } from 'src/guards/inject-webpage.guard';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { YoutubeVideosBlockDto } from './dto/youtube-videos';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get('page/:webpageId')
  @UseGuards(InjectWebpageGuard)
  async getPageBlocks(@Request() req: any) {
    const webpage: Webpage = req.getWebpage();
    return this.blockService.mapToBlockDto(
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

    const validators = {
      header: HeaderBlockDto,
      youtubeVideos: YoutubeVideosBlockDto,
      generic: BlockDto,
    };

    try {
      await Promise.all<Promise<BlockDto>>(
        createBlockDto.blocks.map(async (blk) => {
          const val = await transformAndValidate(
            validators[blk.blockType] ?? validators['generic'],
            blk,
            {
              validator: { whitelist: true },
            },
          );
          return val as BlockDto;
        }),
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
