import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { InjectWebpageGuard } from 'src/guards/inject-webpage.guard';
import { BlockActionsRequest } from './dto/block-request.dto';
import { BlockService } from './blocks.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  // @UseGuards(InjectWebpageGuard)
  @UseGuards(JwtAuthGuard, InjectWebpageGuard)
  @HttpCode(200)
  @Post()
  async performActions(@Body() dto: BlockActionsRequest) {
    return this.blockService.executeActions(dto);
  }
}
