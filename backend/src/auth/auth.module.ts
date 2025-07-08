import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';
import { PasswordResetController } from '../password-reset/password-reset.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CloudinaryModule,
    MailModule
  ],
  controllers: [AuthController, PasswordResetController],
  providers: [AuthService, AuthGuard, PasswordResetService, MailService],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}
