import { Injectable } from '@nestjs/common';
import { CreateMediaReq } from './dto';
import { Media } from './entities/media.entity';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class MediaService {
  mediaRepository: Repository<Media>;

  constructor(
    private dataSource: DataSource,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    this.mediaRepository = this.dataSource.getRepository(Media);
  }

  async saveBulk(mediaList: Media[]): Promise<InsertResult> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Media)
      .values(mediaList)
      .execute();
  }

  async findMedia(
    webpageId: string,
    mediaType?: string,
    mediaProvider?: string,
    limit = 10,
    offset = 0,
  ): Promise<Media[]> {
    return this.mediaRepository.find({
      where: {
        webpageId,
        isDeleted: false,
        ...(mediaType ? { mediaType } : {}),
        ...(mediaProvider ? { mediaProvider } : {}),
      },
      take: limit,
      skip: offset * limit,
      order: {
        publishedAt: 'DESC',
      },
    });
  }

  // mapToMediaDataParts(createDataPartDto: NewMediaReq): Media[] {
  //   return this.mapper
  //     .mapArray(createDataPartDto.dataParts, CreateMediaDataPart, Media)
  //     .map((m) => {
  //       m.webpageId = createDataPartDto.webpageId;
  //       return m;
  //     });
  // }
}
