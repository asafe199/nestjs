import { Injectable } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import * as process from 'node:process';

@Injectable()
export class RabbitmqService {
  getOption(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        persistent: true,
        urls: [process.env['RABBIT_MQ_URL'] as string],
        queue: process.env[`RABBIT_MQ_${queue}`],
        noAck,
      },
    };
  }
}
