import { Module } from '@nestjs/common';
import { PageSectionService } from './sections.service';
import { PageSectionMappingProfile } from './section.mapping-profile';

@Module({
  providers: [PageSectionService, PageSectionMappingProfile],
  exports: [PageSectionService],
})
export class PageSectionModule {}
