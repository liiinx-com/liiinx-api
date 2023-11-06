import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  ActionResult,
  BaseActionPayloadDto,
  BlockActionsRequest,
  PatchActionChangeTypes,
} from './dto';
import { HeaderService } from './blocks/header/header.service';
import {
  CreateHeaderBlockPayload,
  DeleteHeaderBlockPayload,
  FetchHeaderBlockPayload,
  PatchHeaderBlockPayload,
} from './blocks/header/header.dto';
import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { RESOURCE_OR_ACTION_NOT_SUPPORTED } from 'src/shared/error-codes';
import {
  BaseBlockResponseDto,
  PageLayoutDto,
} from './blocks/_base-block/base-block.dto';
import { FooterService } from './blocks/footer/footer.service';
import { IBlockServiceActions } from './iblock-service-actions';
import { WebpageBlock } from './blocks/_base-block/base-block.entity';

const ACTION_HANDLER_NAME_POSTFIX = 'Action';

export class ExecuterFnParam<Payload> {
  resource: string;
  action: string;
  manager: EntityManager;
  webpage: Webpage;
  payload: Payload;
  patchActionUpdates?: PatchActionChangeTypes;
}

interface BlockAction {
  executerService: IBlockServiceActions<
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  >;
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

  async getBlocksByPageId(id: string): Promise<WebpageBlock[]> {
    return this.entityManager.getRepository(WebpageBlock).find({
      where: {
        webpageId: id,
        isActive: true,
        isDeleted: false,
        isArchived: false,
      },
      order: {
        order: 'asc',
      },
    });
  }

  // async mapToBaseBlock(block: BlockTemplateEntity): Promise<WebpageBlock> {
  //   return this.mapper.map(block, BlockTemplateEntity, WebpageBlock);
  // }

  async validatePayload(
    resource: string,
    action: string,
    payload: BaseActionPayloadDto,
  ): Promise<BaseActionPayloadDto> {
    const { executerFnPayloadClass } = this.validateActionAndGetBlockAction(
      resource,
      action,
    );

    return transformAndValidate(executerFnPayloadClass, payload, {
      validator: { whitelist: true },
    });
  }

  async getCreateBlockPayloadFor(
    resource: string,
  ): Promise<BaseBlockResponseDto> {
    const blocks = {
      header: this.headerService.getCreateBlockPayload,
    };
    return blocks[resource]();
  }

  private async execute(
    manager: EntityManager,
    { actions, injectedWebpage }: BlockActionsRequest,
  ): Promise<ActionResult<unknown>[]> {
    const actionResults: ActionResult<unknown>[] = [];

    for (const {
      action: _action,
      payload,
      resource: _resource,
      patchActionUpdates,
    } of actions) {
      const action = _action.toLowerCase();
      const resource = _resource.toLowerCase();

      const { executerService } = this.validateActionAndGetBlockAction(
        resource,
        action,
      );

      try {
        const validatedPayload = await this.validatePayload(
          resource,
          action,
          payload,
        );

        // base block - create
        // 1. const baseBlock = await baseBlockService.getDefaultBlock()
        // 2. setPropertiesFrom(source: payload , dest:defaultBaseBlock)
        // 3. call await beforeSave([baseBlock]);
        // 4. await manager.getRepository().save(baseBlock)
        // 5. call await afterSave([baseBlock]);

        // block - create
        // 1. const block = await executerService.getDefaultBlock()
        // 2. utils.setPropertiesFrom(source: payload , dest:block)
        // 3. block.BaseBlockId = baseBlock.id;
        // 4. call await executerService.beforeSave([baseBlock, block]);
        // 5. await manager.getRepository().save(block)
        // 6. call await afterSave([baseBlock, block]);

        // result = executerService.mapToBlockDto(baseBlock, block)

        // TODO: preAction operations

        const params = {
          resource,
          action,
          manager,
          ...(action === 'patch' ? { patchActionUpdates } : {}),
          webpage: injectedWebpage,
          payload: validatedPayload as any,
        };
        const actionResult = await executerService[
          action + ACTION_HANDLER_NAME_POSTFIX
        ](params);

        // TODO: postAction operations

        actionResults.push(actionResult);
      } catch (e) {
        let messages: Record<string, Record<string, Record<string, string>>>;
        console.error('[*] block actions error \n', e);
        if (e instanceof HttpException) {
          messages = {
            [resource]: {
              [action]: {
                error: e.message,
              },
            },
          };
        } else {
          messages = (e as ValidationError[]).reduce(
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
        }

        throw new HttpException(messages, HttpStatus.BAD_REQUEST);
      }
    }
    return actionResults;
  }

  async executeActions(
    actions: BlockActionsRequest,
  ): Promise<ActionResult<unknown>[]> {
    let actionResults: ActionResult<unknown>[] = [];

    await this.entityManager.transaction(async (manager) => {
      actionResults = await this.execute(manager, actions);
    });
    return actionResults;
  }

  async executeActionsUsingManager(
    manager: EntityManager,
    actions: BlockActionsRequest,
  ): Promise<ActionResult<unknown>[]> {
    return this.execute(manager, actions);
  }

  // TODO: Can we move this method to a separate service?
  validateActionAndGetBlockAction(
    resource: string,
    action: string,
  ): BlockAction {
    const blocks: Record<string, Record<string, BlockAction>> = {
      header: {
        fetch: {
          executerService: this.headerService,
          executerFnPayloadClass: FetchHeaderBlockPayload,
        },
        create: {
          executerService: this.headerService,
          executerFnPayloadClass: CreateHeaderBlockPayload,
        },
        patch: {
          executerService: this.headerService,
          executerFnPayloadClass: PatchHeaderBlockPayload,
        },
        delete: {
          executerService: this.headerService,
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

  async generatePageLayoutConfig(
    webPageId: string,
    // blocks: WebpageBlock[],
  ): Promise<PageLayoutDto> {
    const pageBaseBlocks = await this.getBlocksByPageId(webPageId);

    return {
      dir: 'rtl',
      footer: null, // this.footerService.getByPageId(webPageId),
      header: null, //await this.headerService.getDefaultBlockDto(),
      faviconUrl:
        'https://pbwebmedia.nl/wp-content/uploads/2021/08/cropped-logo-bars-32x32.png',
    };
  }
}
