import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { MongoModule, RabbitmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationsService } from './service/notifications.service';
import { NotificationController } from './controller/notification.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_MASTER: Joi.string().required(),
        RABBIT_MQ_URL: Joi.string().required(),
      }),
    }),
    RabbitmqModule.register({
      name: 'Master',
    }),
    MongoModule,
  ],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
