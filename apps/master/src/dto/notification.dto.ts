import { IsEmail, IsNotEmpty } from 'class-validator';
import * as crypto from 'node:crypto';

export class NotificationDto {
  id: string = crypto.randomUUID();
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
