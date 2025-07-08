import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as process from 'node:process';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"TodoApp" <your_email@gmail.com>',
      }
    })
  ],
  providers: [MailService],
  exports: [MailService], // 👈 Cho phép module khác sử dụng
})
export class MailModule {}
