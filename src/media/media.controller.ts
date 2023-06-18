import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { InjectWebpageGuard } from 'src/guards/inject-webpage.guard';
import { MediaService } from './media.service';
import {
  CreateMediaReq,
  CreateMediaItem,
  GetMediaResponse,
  MediaItemResponse,
} from './dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Media } from './entities/media.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @UseGuards(InjectWebpageGuard)
  @Get(':webpageId')
  async getMediaForPage(
    @Request() req: any,
    @Query('provider') mediaProvider = 'youtube',
    @Query('type') mediaType = 'video',
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<GetMediaResponse> {
    const webpage: Webpage = req.getWebpage();
    const mediaList = await this.mediaService.findMedia(
      webpage.id,
      mediaType,
      mediaProvider,
      limit,
      offset,
    );

    const result = new GetMediaResponse();
    result.items = this.mapper.mapArray(mediaList, Media, MediaItemResponse);
    result.limit = -1;
    result.offset = -1;

    return result;
  }

  // @UseGuards(InjectWebpageGuard)
  // @Post()
  // @HttpCode(200)
  // async getMedia(
  //   @Body() getDataPartDto: GetDataPartDtoRequest,
  // ): Promise<MediaResponseDto> {
  //   const validators = {
  //     media: GetMediaDataPart,
  //   };

  //   if (getDataPartDto.dataParts.length !== 1) {
  //     throw new HttpException(
  //       'ONLY_ONE_DATA_PART_SUPPORTED',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   try {
  //     await Promise.all<Promise<GenericDataPartDto>>(
  //       getDataPartDto.dataParts.map(async (part) => {
  //         if (
  //           !validators[part.dataPartType] ||
  //           (part as GetMediaDataPart).mediaProvider !== 'youtube' ||
  //           (part as GetMediaDataPart).mediaType !== 'video'
  //         )
  //           throw new HttpException(
  //             'DATA_PART_NOT_SUPPORTED',
  //             HttpStatus.BAD_REQUEST,
  //           );
  //         const val = await transformAndValidate(
  //           validators[part.dataPartType],
  //           part,
  //           {
  //             validator: { whitelist: true },
  //           },
  //         );
  //         return val as GenericDataPartDto;
  //       }),
  //     );
  //     const mediaList = lodash.flatten(
  //       await Promise.all(
  //         getDataPartDto.dataParts.map((p: GetMediaDataPart) =>
  //           this.mediaService.findMedia(
  //             getDataPartDto.webpageId,
  //             p.mediaType,
  //             p.mediaProvider,
  //             //   p.limit,
  //             //   p.offset,
  //           ),
  //         ),
  //       ),
  //     );
  //     const result = new MediaResponseDto();
  //     result.limit = -1;
  //     result.offset = -1;
  //     return result;
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @UseGuards(InjectWebpageGuard)
  @Post()
  async create(@Body() createMediaDto: CreateMediaReq) {
    createMediaDto.items = createMediaDto.items.map((item) => {
      item.webpageId = createMediaDto.webpageId;
      return item;
    });
    await this.mediaService.saveBulk(
      this.mapper.mapArray(createMediaDto.items, CreateMediaItem, Media),
    );
  }
}
