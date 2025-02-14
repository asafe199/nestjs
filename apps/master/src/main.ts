import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitmqService } from '@app/common';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appService = app.get<RabbitmqService>(RabbitmqService);
  appService.loadService(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);
}

bootstrap();
