import { Mapper } from '@automapper/core';
import { BaseBlockService } from './_base-block/base-block.service';
import { ExecuterFnParam } from '../blocks.service';
import {
  ActionResult,
  DeleteBaseUIBlockPayloadDto,
  FetchBaseUIBlockPayloadDto,
  PatchActionChangeTypes,
} from '../dto';
import { EntityManager, Repository } from 'typeorm';
import { BlockTemplateEntity } from './_base-block/block-template.entity';
import { WebpageBlock } from './_base-block/base-block.entity';
import {
  BaseBlockResponseDto,
  PatchBaseBlockDto,
} from './_base-block/base-block.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { INVALID_BLOCK_VARIANT } from 'src/shared/error-codes';

export abstract class AbstractBlockService<
  BlockEntity extends BlockTemplateEntity,
  BlockDto,
  CreateBlockPayload extends BaseBlockResponseDto,
  PatchBlockPayload extends PatchBaseBlockDto,
  DeleteBlockPayload extends DeleteBaseUIBlockPayloadDto,
> {
  constructor(
    protected readonly mapper: Mapper,
    protected readonly baseBlockService: BaseBlockService,
  ) {}

  abstract mergeEntities(
    manager: EntityManager,
    mergeIntoEntity: BlockEntity,
    partialEntity: Partial<BlockEntity>,
  ): void;
  abstract getBlockVariants(): Promise<string[]>;
  abstract getBlockRepository(manager?: EntityManager): Repository<BlockEntity>;
  abstract getCreateBlockPayload(): Promise<CreateBlockPayload>;
  abstract mapToBlockDto(
    baseBlockEntity: WebpageBlock,
    blockEntity: BlockEntity,
  ): BlockDto;
  abstract mapToBaseBlockEntity(
    payload: CreateBlockPayload | PatchBlockPayload,
  ): Promise<WebpageBlock>;
  abstract mapToBlockEntity(
    payload: CreateBlockPayload | PatchBlockPayload,
  ): Promise<BlockEntity>;

  async isValidVariant(variant: string): Promise<boolean> {
    return (await this.getBlockVariants()).includes(
      variant.toLocaleLowerCase(),
    );
  }

  // TODO: Should handle one and many
  async fetchAction({
    resource,
    action,
    payload,
  }: ExecuterFnParam<FetchBaseUIBlockPayloadDto>): Promise<
    ActionResult<BlockDto>
  > {
    const [baseBlockEntity, blockEntity] =
      await this.baseBlockService.fetchOneByBlockIdOrException<BlockEntity>(
        this.getBlockRepository(),
        payload.blockId,
      );

    return new ActionResult<BlockDto>({
      resource,
      action,
      ok: true,
      response: this.mapToBlockDto(baseBlockEntity, blockEntity),
    });
  }

  async createAction({
    resource,
    action,
    manager,
    webpage,
    payload,
  }: ExecuterFnParam<CreateBlockPayload>): Promise<ActionResult<BlockDto>> {
    if (!(await this.isValidVariant(payload.blockVariant))) {
      throw new HttpException(INVALID_BLOCK_VARIANT, HttpStatus.BAD_REQUEST);
    }

    // save baseBlock
    const baseBlockPayload = await this.mapToBaseBlockEntity(payload);
    baseBlockPayload.webpageId = webpage.id;
    baseBlockPayload.blockId = '-';
    const saveBaseBlockEntity = await this.baseBlockService.saveBaseBlock(
      manager,
      baseBlockPayload,
    );

    // save Block
    const blockEntityPayload = await this.mapToBlockEntity(payload);
    blockEntityPayload.baseBlockId = saveBaseBlockEntity.id;
    const saveBlockEntity = await this.getBlockRepository(manager).save(
      blockEntityPayload,
    );

    // update baseBlock.blockId
    saveBaseBlockEntity.blockId = saveBlockEntity.id;
    const updateBaseBlockEntity = await this.baseBlockService.saveBaseBlock(
      manager,
      saveBaseBlockEntity,
    );

    return new ActionResult<BlockDto>({
      resource,
      action,
      ok: true,
      response: this.mapToBlockDto(updateBaseBlockEntity, saveBlockEntity),
    });
  }

  async patchAction({
    resource,
    action,
    manager,
    payload,
    patchActionUpdates,
  }: ExecuterFnParam<PatchBlockPayload>): Promise<ActionResult<BlockDto>> {
    const [baseBlockEntity, blockEntity] =
      await this.baseBlockService.fetchOneByBlockIdOrException<BlockEntity>(
        this.getBlockRepository(manager),
        payload.blockId,
      );

    if (
      payload.blockVariant &&
      !(await this.isValidVariant(payload.blockVariant))
    )
      throw new HttpException(INVALID_BLOCK_VARIANT, HttpStatus.BAD_REQUEST);

    // TODO: avoid update blockId, type,

    let patchedBaseBlock = baseBlockEntity;
    let patchedBlock = blockEntity;
    if (
      [
        PatchActionChangeTypes.BASE_BLOCK_ONLY,
        PatchActionChangeTypes.BOTH,
      ].includes(patchActionUpdates)
    ) {
      const baseBlockPayload = await this.mapToBaseBlockEntity(payload);
      this.baseBlockService.mergeEntities(
        manager,
        baseBlockEntity,
        baseBlockPayload,
      );
      // baseBlockPayload.webpageId = webpage.id; // TODO: may not be needed
      patchedBaseBlock = await this.baseBlockService.saveBaseBlock(
        manager,
        baseBlockEntity,
      );
    } else if (
      [PatchActionChangeTypes.BLOCK_ONLY, PatchActionChangeTypes.BOTH].includes(
        patchActionUpdates,
      )
    ) {
      const blockEntityPayload = await this.mapToBlockEntity(payload);
      this.mergeEntities(manager, blockEntity, blockEntityPayload);
      patchedBlock = await this.getBlockRepository(manager).save(blockEntity);
    }

    return new ActionResult<BlockDto>({
      resource,
      action,
      ok: true,
      response: this.mapToBlockDto(patchedBaseBlock, patchedBlock),
    });
  }

  async deleteAction({
    resource,
    action,
    manager,
    payload,
  }: ExecuterFnParam<DeleteBlockPayload>): Promise<ActionResult<BlockDto>> {
    const [baseBlockEntity] =
      await this.baseBlockService.fetchOneByBlockIdOrException<BlockEntity>(
        this.getBlockRepository(manager),
        payload.blockId,
      );

    baseBlockEntity.isDeleted = true;
    await this.baseBlockService.saveBaseBlock(manager, baseBlockEntity);

    return new ActionResult<BlockDto>({
      resource,
      action,
      ok: true,
    });
  }
}
