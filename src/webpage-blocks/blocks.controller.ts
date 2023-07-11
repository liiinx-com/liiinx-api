import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectWebpageGuard } from 'src/guards/inject-webpage.guard';
import { BlockActionsRequest } from './dto/block-request.dto';
import { BlockService } from './blocks.service';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @UseGuards(InjectWebpageGuard)
  @Post()
  async performActions(@Body() dto: BlockActionsRequest) {
    return this.blockService.executeAction(dto);
  }
}
