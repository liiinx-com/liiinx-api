import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ActionResult, BaseActionPayloadDto, BlockActionsRequest } from './dto';
import { WebpageBlock } from './base-block/base-block.entity';
import { HeaderService } from './blocks/header/header.service';
import {
  CreateHeaderBlockPayload,
  DeleteHeaderBlockPayload,
  PatchHeaderBlockPayload,
} from './blocks/header/header.dto';
import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { RESOURCE_OR_ACTION_NOT_SUPPORTED } from 'src/shared/error-codes';
import { PageLayoutDto } from './base-block/base-block.dto';
import { FooterService } from './blocks/footer/footer.service';

export class ExecuterFnParam<Payload> {
  resource: string;
  action: string;
  manager: EntityManager;
  webpage: Webpage;
  payload: Payload; //BaseActionPayloadDto; //BaseUIBlockActionPayloadDto;
}

interface BlockAction {
  executerFn: (
    params: ExecuterFnParam<BaseActionPayloadDto>,
  ) => Promise<ActionResult>;
  executerFnPayloadClass: typeof BaseActionPayloadDto;
}

@Injectable()
export class BlockService {
  constructor(
    @InjectEntityManager()
    @InjectMapper()
    private readonly mapper: Mapper,
    private entityManager: EntityManager,
    private readonly headerService: HeaderService,
    private readonly footerService: FooterService,
  ) {}

  async validatePayload(
    resource: string,
    action: string,
    payload: BaseActionPayloadDto,
  ): Promise<BaseActionPayloadDto> {
    const { executerFnPayloadClass } = this.getBlockAction(resource, action);
    return transformAndValidate(executerFnPayloadClass, payload, {
      validator: { whitelist: true },
    });
  }

  async executeAction({
    actions,
    injectedWebpage,
  }: BlockActionsRequest): Promise<ActionResult[]> {
    const actionResults: ActionResult[] = [];

    await this.entityManager.transaction(async (manager) => {
      for (const { action, payload, resource } of actions) {
        const { executerFn } = this.getBlockAction(resource, action);
        try {
          const validatedPayload = await this.validatePayload(
            resource,
            action,
            payload,
          );

          actionResults.push(
            await executerFn({
              resource,
              action,
              manager,
              webpage: injectedWebpage,
              payload: validatedPayload,
            }),
          );
        } catch (e) {
          const messages: Record<
            string,
            Record<string, Record<string, string>>
          > = (e as ValidationError[]).reduce(
            (acc, { property, constraints }) => {
              if (!acc[resource]) acc[resource] = {};
              if (!acc[resource][action]) acc[resource][action] = {};
              acc[resource][action][property] = Object.keys(constraints).map(
                (k) => constraints[k],
              );
              return acc;
            },
            {},
          );

          throw new HttpException(messages, HttpStatus.BAD_REQUEST);
        }
      }
    });
    return actionResults;
  }

  getBlockAction(resource: string, action: string): BlockAction {
    const blocks: Record<string, Record<string, BlockAction>> = {
      header: {
        create: {
          executerFn: this.headerService.createHeader,
          executerFnPayloadClass: CreateHeaderBlockPayload,
        },
        patch: {
          executerFn: this.headerService.patchHeader,
          executerFnPayloadClass: PatchHeaderBlockPayload,
        },
        delete: {
          executerFn: this.headerService.deleteHeader,
          executerFnPayloadClass: DeleteHeaderBlockPayload,
        },
      },
    };

    if (!blocks[resource] || !blocks[resource][action])
      throw new HttpException(
        RESOURCE_OR_ACTION_NOT_SUPPORTED,
        HttpStatus.BAD_REQUEST,
      );
    return blocks[resource][action];
  }

  //-------
  mapToBaseBlockDto(blocks: WebpageBlock[]): any[] {
    // return this.mapper.mapArray(blocks, WebpageBlock, BaseBlockDto);
    return null;
  }

  getDefaultLayoutConfig() {
    return null;
  }

  async generatePageLayoutConfig(
    webPageId: string,
    // blocks: WebpageBlock[],
  ): Promise<PageLayoutDto> {
    return {
      dir: 'rtl',
      footer: this.footerService.getByPageId(webPageId),

      header: {
        blockContained: true,
        blockType: 'header',
        blockVariant: 'header1',
        isActive: true,
        textLogo: 'test is here',
        textLogoClassName: 'there is no class',
        textLogoStyle: { color: 'red' },
        wrapperContained: true,
      },
      faviconUrl:
        'https://pbwebmedia.nl/wp-content/uploads/2021/08/cropped-logo-bars-32x32.png',
    };
  }
}
