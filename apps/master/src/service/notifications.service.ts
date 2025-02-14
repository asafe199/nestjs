import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';

@Injectable()
export class NotificationsService {
  private readonly log = new Logger(NotificationsService.name);
  constructor(@Inject('Master') private readonly clientProxy: ClientProxy) {}

  sendNotification(body: NotificationDto) {
    this.clientProxy.send('notifications', body);
  }
}
