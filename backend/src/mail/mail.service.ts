import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService:MailerService) {}
  async sendRestPasswordEmail(email: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset password',
      text: `Click here to reset your password: ${resetLink}`,
      html: `<b>Click here to reset your password:</b> <a href="${resetLink}">${resetLink}</a>`,
    })
  }
}
