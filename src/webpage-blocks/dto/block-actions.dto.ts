export class ActionResult<T> {
  messages: string[];
  response: T;
  resource: string;
  action: string;
  ok: boolean;

  constructor({
    resource,
    action,
    ok = false,
    response = null,
  }: {
    resource: string;
    action: string;
    ok?: boolean;
    response?: T;
  }) {
    this.messages = [];
    this.response = null;
    this.action = action;
    this.ok = ok;
    this.response = response;
    this.resource = resource;
  }
}

export class BaseActionPayloadDto {}

// will be used for non-ui blocks. e.g. profile data
// class BaseDataBlockActionPayloadDto extends BaseActionPayloadDto {}
// export class BaseUIBlockPayloadDto extends BaseActionPayloadDto {
// constructor() {
//   super();
//   this.order = 0;
// }
// @IsString()
// @IsNotEmpty()
// @AutoMap()
// blockVariant: string;
// @IsOptional()
// @AutoMap()
// blockClassName?: string;
// @IsOptional()
// @IsObject()
// @AutoMap()
// blockStyle?: object;
// @IsBoolean()
// @AutoMap()
// blockContained: boolean;
// @IsBoolean()
// @AutoMap()
// wrapperContained: boolean;
// @IsInt()
// @AutoMap()
// order: number;
// @IsOptional()
// @AutoMap()
// wrapperClassName?: string;
// @IsOptional()
// @IsObject()
// @AutoMap()
// wrapperStyle?: object;
// @IsBoolean()
// @IsOptional()
// @AutoMap()
// isActive?: boolean;
// }
