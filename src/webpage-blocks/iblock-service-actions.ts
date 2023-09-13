import { ExecuterFnParam } from './blocks.service';
import { ActionResult } from './dto';

export interface IBlockServiceActions<
  FetchPayloadType,
  CreatePayloadType,
  PatchPayloadType,
  DeletePayloadType,
  ActionResultDtoType,
  // ActionResultEntityType,
> {
  // getDefaultBlockEntity: () => ActionResultEntityType;

  getCreateBlockPayload: () => Promise<CreatePayloadType>;
  fetchAction: (
    params: ExecuterFnParam<FetchPayloadType>,
  ) => Promise<ActionResult<ActionResultDtoType>>;
  createAction: (
    params: ExecuterFnParam<CreatePayloadType>,
  ) => Promise<ActionResult<ActionResultDtoType>>;
  patchAction: (
    params: ExecuterFnParam<PatchPayloadType>,
  ) => Promise<ActionResult<ActionResultDtoType>>;
  deleteAction: (
    params: ExecuterFnParam<DeletePayloadType>,
  ) => Promise<ActionResult<ActionResultDtoType>>;
}
