import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { transformAndValidate } from 'class-transformer-validator';
import { lodash } from 'src/utils';
import { InjectWebpageGuard } from 'src/guards/inject-webpage.guard';
import {
  CreateDataPartsReq,
  GenericDataPartDto,
  CreateMediaDataPart,
  GetDataPartDtoRequest,
  GetMediaDataPart,
  MediaResponseDto,
} from './dto';
import { MediaService } from './media.service';

@Controller('data-parts')
export class WebsiteDataController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(InjectWebpageGuard)
  @Post()
  @HttpCode(200)
  async getDataParts(
    @Body() getDataPartDto: GetDataPartDtoRequest,
  ): Promise<MediaResponseDto> {
    const validators = {
      media: GetMediaDataPart,
    };

    if (getDataPartDto.dataParts.length !== 1) {
      throw new HttpException(
        'ONLY_ONE_DATA_PART_SUPPORTED',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await Promise.all<Promise<GenericDataPartDto>>(
        getDataPartDto.dataParts.map(async (part) => {
          if (
            !validators[part.dataPartType] ||
            (part as GetMediaDataPart).mediaProvider !== 'youtube' ||
            (part as GetMediaDataPart).mediaType !== 'video'
          )
            throw new HttpException(
              'DATA_PART_NOT_SUPPORTED',
              HttpStatus.BAD_REQUEST,
            );
          const val = await transformAndValidate(
            validators[part.dataPartType],
            part,
            {
              validator: { whitelist: true },
            },
          );
          return val as GenericDataPartDto;
        }),
      );
      const mediaList = lodash.flatten(
        await Promise.all(
          getDataPartDto.dataParts.map((p: GetMediaDataPart) =>
            this.mediaService.findMedia(
              getDataPartDto.webpageId,
              p.mediaType,
              p.mediaProvider,
              //   p.limit,
              //   p.offset,
            ),
          ),
        ),
      );
      const result = new MediaResponseDto();
      result.limit = -1;
      result.offset = -1;
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(InjectWebpageGuard)
  @Post('new')
  async newDataParts(@Body() createDataPartDto: CreateDataPartsReq) {
    const validators = {
      media: CreateMediaDataPart,
    };

    try {
      await Promise.all<Promise<GenericDataPartDto>>(
        createDataPartDto.dataParts.map(async (part) => {
          if (
            !validators[part.dataPartType] ||
            (part as CreateMediaDataPart).mediaProvider !== 'youtube' ||
            (part as CreateMediaDataPart).mediaType !== 'video'
          )
            throw new HttpException(
              'DATA_PART_NOT_SUPPORTED',
              HttpStatus.BAD_REQUEST,
            );

          const val = await transformAndValidate(
            validators[part.dataPartType],
            part,
            {
              validator: { whitelist: true },
            },
          );
          return val as GenericDataPartDto;
        }),
      );
      await this.mediaService.saveBulk(
        this.mediaService.mapToMediaDataParts(createDataPartDto),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
