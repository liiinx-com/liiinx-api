import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserIfNotExistThenLoginReq } from './auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async newUserIfNotExistThenLogin(
    @Body()
    dto: NewUserIfNotExistThenLoginReq,
  ) {
    const user = this.mapper.map(dto, NewUserIfNotExistThenLoginReq, User);

    const upsertUser = await this.userService.upsertUser(user);
    const { accessToken } = await this.authService.generateTokens(upsertUser);

    return { accessToken };
  }
}
