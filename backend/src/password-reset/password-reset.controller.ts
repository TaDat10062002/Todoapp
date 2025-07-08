import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.';
import { PasswordResetService } from './password-reset.service';
import { handleError } from '../common/utils/error.handler';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';

@Controller()
export class PasswordResetController {
  constructor(
    private prisma: PrismaService,
    private passwordResetService: PasswordResetService,
  ){}
  @Get('reset-password')
  async verifyToken(@Query('token') token: string){
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          resetPasswordToken: token,
        }
      })
      if(!user){
        throw new BadRequestException('Invalid or expired token');
      }
      return {message: 'Valid token'}
    }
    catch (e) {
      handleError(e)
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Query('token') token: string){
      try {
        const user = await this.prisma.user.findFirst({
          where: {
            resetPasswordToken: token,
          }
        })
        if(!user){
          throw new BadRequestException('Invalid or expired token');
        }
        return this.passwordResetService.resetPassword(user.id,dto);
      }
      catch (e) {
        handleError(e)
      }
  }
}