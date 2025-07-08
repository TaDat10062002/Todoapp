import { Body, Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service.';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { handleError } from '../common/utils/error.handler';
import * as bcrypt from 'bcrypt';
import { createAccessToken } from '../helpers/jwt.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
      createResetToken() : string {
      return crypto.randomBytes(32).toString('hex');
  }
  
  async resetPassword (userId: number, @Body() dto: ResetPasswordDto) {
    const hashed = await bcrypt.hash(dto.newPassword, 10);

    try {
        const user = await this.prisma.user.update({
          where: {
            id: userId,
          },
          data : {
            password: hashed,
            passwordChangedAt: new Date(Date.now() - 1000),
            resetPasswordToken: null,
            resetPasswordTokenExpires: null,
          }
        })

      const payload = {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
      }
      const accessToken = createAccessToken(this.jwtService, payload);
      return {
        message: 'Password reset successfully',
        accessToken: accessToken
      }
    }
    catch (e) {
      handleError(e)
    }
  }
}
