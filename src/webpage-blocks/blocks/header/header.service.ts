import { Injectable } from '@nestjs/common';
import { ActionResult } from 'src/webpage-blocks/dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ExecuterFnParam } from 'src/webpage-blocks/blocks.service';
import {
  CreateHeaderBlockPayload,
  DeleteHeaderBlockPayload,
  HeaderBlockDto,
  PatchHeaderBlockPayload,
} from './header.dto';

@Injectable()
export class HeaderService {
  constructor(
    @InjectMapper()
    readonly mapper: Mapper,
  ) {}

  //==============
  async getByBlockId({
    blockId,
  }: {
    blockId: string;
  }): Promise<HeaderBlockDto> {
    console.log('hererererer');
    return null;
  }

  //==============
  async createHeader({
    resource,
    action,
    manager,
    webpage,
    payload,
  }: ExecuterFnParam<CreateHeaderBlockPayload>): Promise<ActionResult> {
    console.log('validatedPayload=', payload);
    // console.log('webpage', webpage);

    const result = new ActionResult(resource, action);
    return result;
  }

  async patchHeader({
    resource,
    action,
    manager,
    webpage,
    payload,
  }: ExecuterFnParam<PatchHeaderBlockPayload>): Promise<ActionResult> {
    console.log('update ,validatedPayload=', payload);
    // console.log('webpage', webpage);

    const result = new ActionResult(resource, action);
    return result;
  }

  async deleteHeader({
    resource,
    action,
    manager,
    webpage,
    payload,
  }: ExecuterFnParam<DeleteHeaderBlockPayload>): Promise<ActionResult> {
    console.log('validatedPayload=', payload);
    console.log('webpage', webpage);

    console.log(payload.blockId);

    const result = new ActionResult(resource, action);
    return result;
  }
}
