import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from 'src/app.service';
import { ApiInfo } from 'src/configuration/configuration.interface';

const [API_NAME, VERSION] = ['API_NAME', 'VERSION'];

const mockAppService = {
  getApiInfo: jest.fn(async () => {
    return { name: API_NAME, version: VERSION } as ApiInfo;
  }),
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(`${API_NAME} - ${VERSION}`);
  });
});
