import { Injectable, Logger } from '@nestjs/common';
import {
  RmqEvents,
  RmqOptions,
  RmqStatus,
  Transport,
} from '@nestjs/microservices';
import * as process from 'node:process';
import { NestExpressApplication } from '@nestjs/platform-express';

@Injectable()
export class RabbitmqService {
  private readonly log = new Logger(RabbitmqService.name);
  private readonly queues = ['Master'];

  loadService(app: NestExpressApplication) {
    for (const queue of this.queues) {
      const server = app.connectMicroservice(this.getConfig(queue));
      server.status.subscribe((status: RmqStatus) => {
        this.log.debug(status);
      });
      server.on<RmqEvents>('error', (err) => {
        this.log.error(err);
      });
    }
  }

  private getConfig(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        persistent: true,
        urls: [process.env['RABBIT_MQ_URL'] as string],
        queue: queue,
        noAck,
      },
    };
  }
}
