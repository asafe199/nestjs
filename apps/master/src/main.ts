import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitmqService } from '@app/common';
import * as process from 'node:process';
import { RmqEvents, RmqStatus } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const log = new Logger(`Main`);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appService = app.get<RabbitmqService>(RabbitmqService);
  const server = app.connectMicroservice(appService.getOption('Master'));
  server.status.subscribe((status: RmqStatus) => {
    log.debug(status);
  });
  server.on<RmqEvents>('error', (err) => {
    log.error(err);
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);
}

bootstrap();
