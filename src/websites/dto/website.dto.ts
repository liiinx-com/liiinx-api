import { IsNotEmpty } from 'class-validator';

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;
}
