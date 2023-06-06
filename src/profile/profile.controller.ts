import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProfileDto } from './dto';
import { WebpagesService } from 'src/webpages/webpages.service';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private webpageService: WebpagesService,
    private profileService: ProfileService,
  ) {}

  @Get(':webpageId')
  async getPage(@Param('webpageId') webpageId: string) {
    const webpage = await this.webpageService.getById(webpageId);
    if (!webpage)
      throw new HttpException('WEBPAGE_NOT_FOUND', HttpStatus.NOT_FOUND);

    return this.profileService.mapToProfileDto(
      await this.profileService.getBy(webpageId),
    );
  }

  @Post()
  async newProfile(@Body() profileDto: ProfileDto) {
    const webpage = await this.webpageService.getById(profileDto.webpageId);
    if (!webpage)
      throw new HttpException('WEBPAGE_NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.profileService.save(
      this.profileService.mapToProfile(profileDto),
    );
  }
}
