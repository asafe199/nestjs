import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';

@Injectable()
export class NotificationsService {
  private readonly log = new Logger(NotificationsService.name);
  constructor(@Inject('Master') private readonly clientProxy: ClientProxy) {}

  sendNotification(body: NotificationDto) {
    this.log.debug(body);
    this.clientProxy.send('notifications', body);
  }

  @MessagePattern('notifications')
  listen(@Payload() data: any, @Ctx() context: RmqContext): any {
    this.log.debug(`Pattern : ${context.getPattern()}, data:${data}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return data;
  }
}
