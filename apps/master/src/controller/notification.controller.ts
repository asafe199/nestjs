import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationsService } from '../service/notifications.service';

@Controller(`notification`)
export class NotificationController {
  private readonly log = new Logger(NotificationController.name);
  constructor(private readonly notificationService: NotificationsService) {}

  @Post()
  sendNotification(@Body() body: NotificationDto, @Res() res: Response) {
    this.notificationService.sendNotification(body);
    res.status(HttpStatus.OK).send(body);
  }
}
