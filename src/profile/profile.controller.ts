import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileDto } from './dto';
import { ProfileService } from './profile.service';
import { InjectWebpageGuard } from 'src/guards/inject-webpage.guard';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':webpageId')
  @UseGuards(InjectWebpageGuard)
  async getPage(@Request() req: any) {
    const webpage: Webpage = req.getWebpage();

    return this.profileService.mapToProfileDto(
      await this.profileService.getBy(webpage.id),
    );
  }

  @Post()
  @UseGuards(InjectWebpageGuard)
  async newProfile(@Body() profileDto: ProfileDto) {
    await this.profileService.save(
      this.profileService.mapToProfile(profileDto),
    );
  }
}
