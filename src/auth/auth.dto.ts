import { AutoMap } from '@automapper/classes';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NewUserIfNotExistThenLoginReq {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  googleUserId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @AutoMap()
  @IsEmail()
  email: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  googleAccessToken: string;

  @AutoMap()
  @IsBoolean()
  emailVerified: boolean;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  googleIdToken: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @AutoMap()
  @IsNotEmpty()
  @IsInt()
  expiresAt: number;
}
