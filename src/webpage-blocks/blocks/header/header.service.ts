import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  CreateHeaderBlockPayload,
  DeleteHeaderBlockPayload,
  FetchHeaderBlockPayload,
  HeaderBlockDto,
  PatchHeaderBlockPayload,
} from './header.dto';
import { BaseBlockService } from 'src/webpage-blocks/blocks/_base-block/base-block.service';
import { IBlockServiceActions } from 'src/webpage-blocks/iblock-service-actions';
import { HeaderBlockEntity } from './header.entity';
import { EntityManager, Repository } from 'typeorm';
import { WebpageBlock } from 'src/webpage-blocks/blocks/_base-block/base-block.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractBlockService } from '../abstract-block.service';

@Injectable()
export class HeaderService
  extends AbstractBlockService<
    HeaderBlockEntity,
    HeaderBlockDto,
    CreateHeaderBlockPayload,
    PatchHeaderBlockPayload,
    DeleteHeaderBlockPayload
  >
  implements
    IBlockServiceActions<
      FetchHeaderBlockPayload,
      CreateHeaderBlockPayload,
      PatchHeaderBlockPayload,
      DeleteHeaderBlockPayload,
      HeaderBlockDto
      // HeaderBlockEntity
    >
{
  constructor(
    @InjectMapper()
    protected readonly mapper: Mapper,
    @InjectRepository(HeaderBlockEntity)
    private headerRepository: Repository<HeaderBlockEntity>,
    protected readonly baseBlockService: BaseBlockService,
  ) {
    super(mapper, baseBlockService);
  }

  override getBlockRepository(
    manager?: EntityManager,
  ): Repository<HeaderBlockEntity> {
    if (manager) {
      return manager.getRepository(HeaderBlockEntity);
    }
    return this.headerRepository;
  }

  override async getCreateBlockPayload(): Promise<CreateHeaderBlockPayload> {
    const result = new CreateHeaderBlockPayload();
    result.blockContained = true;
    result.blockType = 'header';
    result.blockVariant = 'header1';
    result.blockClassName = '';
    result.wrapperContained = true;
    result.wrapperClassName = '';
    result.blockStyle = {};
    result.isLtr = true;
    result.isActive = true;

    result.textLogo = 'Text Logo';
    result.textLogoProps = {};
    return result;
  }

  override mergeEntities(
    manager: EntityManager,
    mergeIntoEntity: HeaderBlockEntity,
    partialEntity: Partial<HeaderBlockEntity>,
  ) {
    manager.merge(HeaderBlockEntity, mergeIntoEntity, partialEntity);
  }

  override async mapToBaseBlockEntity(
    payload: CreateHeaderBlockPayload | PatchHeaderBlockPayload,
  ): Promise<WebpageBlock> {
    let result: WebpageBlock;

    if (payload instanceof CreateHeaderBlockPayload)
      result = this.mapper.map(payload, CreateHeaderBlockPayload, WebpageBlock);

    if (payload instanceof PatchHeaderBlockPayload)
      result = this.mapper.map(payload, PatchHeaderBlockPayload, WebpageBlock);

    return result;
  }

  override async mapToBlockEntity(
    payload: CreateHeaderBlockPayload | PatchHeaderBlockPayload,
  ): Promise<HeaderBlockEntity> {
    let result: HeaderBlockEntity;

    if (payload instanceof CreateHeaderBlockPayload) {
      const enrichedPayload = {
        ...(await this.getCreateBlockPayload()),
        ...payload,
      };

      result = this.mapper.map(
        enrichedPayload,
        CreateHeaderBlockPayload,
        HeaderBlockEntity,
      );
    }

    if (payload instanceof PatchHeaderBlockPayload)
      result = this.mapper.map(
        payload,
        PatchHeaderBlockPayload,
        HeaderBlockEntity,
      );

    return result;
  }

  override mapToBlockDto(
    baseBlockEntity: WebpageBlock,
    blockEntity: HeaderBlockEntity,
  ): HeaderBlockDto {
    return {
      ...this.mapper.map(baseBlockEntity, WebpageBlock, HeaderBlockDto),
      ...this.mapper.map(blockEntity, HeaderBlockEntity, HeaderBlockDto),
    };
  }

  override async getBlockVariants(): Promise<string[]> {
    return ['header1'];
  }
}
