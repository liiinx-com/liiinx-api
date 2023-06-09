import { AutoMap } from '@automapper/classes';

export class BaseEntityDto {
  @AutoMap()
  id?: string;

  @AutoMap()
  isActive?: boolean;

  @AutoMap()
  isArchived?: boolean; // visible to user
}
