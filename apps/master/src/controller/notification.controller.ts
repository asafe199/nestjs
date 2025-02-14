import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationsService } from '../service/notifications.service';

@Controller(`notification`)
export class NotificationController {
  private readonly log = new Logger(NotificationController.name);
  constructor(private readonly notificationService: NotificationsService) {}

  @MessagePattern('notifications')
  listen(@Payload() data: any, @Ctx() context: RmqContext): any {
    this.log.debug(`Pattern : ${context.getPattern()}, data:${data}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return data;
  }

  @Post()
  sendNotification(@Body() body: NotificationDto, @Res() res: Response) {
    this.log.debug(body);
    this.notificationService.sendNotification(body);
    res.status(HttpStatus.OK).send(body);
  }
}
