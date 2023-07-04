// import { AutoMap } from '@automapper/classes';
// import {
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from 'class-validator';
// import { Type } from 'class-transformer';
// import { BlockDto, BlockOptions } from './block';

// export class YoutubeVideosProps extends BlockOptions {
//   @IsString()
//   @IsNotEmpty()
//   dir: string;
// }

// export class YoutubeVideosBlockDto extends BlockDto {
//   @AutoMap()
//   @ValidateNested()
//   @Type(() => YoutubeVideosProps)
//   @IsOptional()
//   blockOptions?: YoutubeVideosProps;
// }
