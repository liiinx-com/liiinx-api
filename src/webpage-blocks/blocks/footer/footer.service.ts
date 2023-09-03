import { Injectable } from '@nestjs/common';

@Injectable()
export class FooterService {
  getByPageId(id: string) {
    return {
      textLogo: 'footer text logo',
      blockContained: true,
      blockType: '',
      blockVariant: '',
      isActive: true,
      wrapperContained: false,
    };
  }
}
