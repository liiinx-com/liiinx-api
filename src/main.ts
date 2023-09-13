import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';
import { AllExceptionsFilter } from './all-exceptions.filter';

const JSON_SIZE_LIMIT = '50mb';
const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.use(json({ limit: JSON_SIZE_LIMIT }));
  app.use(urlencoded({ extended: true, limit: JSON_SIZE_LIMIT }));
  await app.listen(process.env.PORT || DEFAULT_PORT);
}
bootstrap();
