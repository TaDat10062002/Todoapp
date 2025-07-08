import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/regiser-user.dto';
import { PrismaService } from '../../prisma/prisma.service.';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { createAccessToken } from '../helpers/jwt.util';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateCredentials } from './dto/update-credentials.dto';
import { handleError } from '../common/utils/error.handler';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
    private passwordResetService: PasswordResetService,
    private mailService: MailService,
  ) {}
  async register(dto: RegisterUserDto) {
  const {fullName, email, password} = dto;
  const user = await this.prisma.user.findUnique({
    where: {
      email: email,
    }})
    if(user){
      throw new ConflictException('Email already exists')
    }
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          fullName: fullName,
          email: email,
          password: hashed,
        }
      })

      const payload = {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
      }

      const accessToken = createAccessToken(this.jwtService, payload);

      delete (user as any).password;
      delete (user as any).passwordChangedAt;
      delete (user as any).resetPasswordToken;
      delete (user as any).resetPasswordTokenExpires;

      return {
        message: 'Register successfully',
        user: user,
        accessToken: accessToken,
      };
    }
    catch (e) {
        handleError(e)
    }
  }

  async login(dto: LoginUserDto) {
    const {email, password} = dto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        }})

      if(!user){
        throw new NotFoundException('Email not found. Please register first or try again')
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        throw new UnauthorizedException('Password is incorrect. Please try again')
      }

      const payload = {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
      }

      const accessToken = createAccessToken(this.jwtService, payload);
      delete (user as any).password;
      delete (user as any).passwordChangedAt;
      delete (user as any).resetPasswordToken;
      delete (user as any).resetPasswordTokenExpires;

      return {
        message: 'Login successfully',
        user: user,
        accessToken: accessToken
      };
    }
    catch (e) {
      handleError(e)
    }
  }

  async getProfile(req:any) {
    const {sub} = req.user;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: sub,
        }
      });

      if (!user) throw new NotFoundException();
      delete (user as any).password;
      delete (user as any).passwordChangedAt;
      delete (user as any).resetPasswordToken;
      delete (user as any).resetPasswordTokenExpires;

      return {
        'message': 'Get profile successfully',
        'user': user,
      }
    }
    catch (e) {
      handleError(e)
    }
  }

  async updateProfile(req:any, dto: UpdateProfileDto ) {
    const {fullName, imageUrl} = dto;
    const {sub} = req.user;
    try {
      let uploadedImageUrl: string | undefined
      if(imageUrl){
        const result = await this.cloudinaryService.uploadImageFromUrl(imageUrl)
        uploadedImageUrl = result.secure_url;
      }

      const updatedUser = await this.prisma.user.update({
        where: {id: sub},
        data: {
          fullName: fullName,
          imageUrl: uploadedImageUrl
        }
      });

      delete (updatedUser as any).password;
      delete (updatedUser as any).passwordChangedAt;
      return {
        message: 'Update profile successfully',
        updatedUser: updatedUser
      }
    }
    catch (e) {
      handleError(e)
    }
  }

  async updateCredentials(req:any, dto: UpdateCredentials) {
    const {currentPassword, newPassword} = dto;
    const {sub} =req.user;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: sub
        }
      })

      if(!user) throw new NotFoundException();

      if(!dto.currentPassword && !dto.newPassword){
        return {message: 'Nothing changes now!!!'}
      }

      const isMatch =  await bcrypt.compare(currentPassword, user.password);
      if(!isMatch){
        throw new BadRequestException('Incorrect password')
      }
      // hashedPassword
      const hashed = await bcrypt.hash(newPassword, 10);

      const isSame = await bcrypt.compare(newPassword, user.password)
      if(isSame){
        throw new BadRequestException('New password must be different with the current password')
      }

      await this.prisma.user.update({
        where: {
          id: sub
        }, data: {
          password: hashed,
          passwordChangedAt: new Date(Date.now() - 1000)
        }
      })

      const payload = {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
      }

      const accessToken = createAccessToken(this.jwtService, payload);

      return {
        message: 'Update credentials successfully',
        accessToken: accessToken
      }
    }
    catch (e) {
      handleError(e)
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const {email} = dto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        }
      })

      if(!user){
        return {
          "message": "Nếu mailer tồn tại trong hệ thống, chúng tôi đã gửi hướng dẫn khôi phục mật khẩu."
        }
      }

      // goi service PasswordResetService de tao token
      const resetPasswordToken  = this.passwordResetService.createResetToken();
      // luu token vao db
      await this.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          resetPasswordToken: resetPasswordToken,
        }
      })

      // goi link mailer + token de thay doi password
      const resetLink = `http://localhost:3000/reset-password?token=${resetPasswordToken}`;
      // sent mail cai link nay de co the reset password
      await this.mailService.sendRestPasswordEmail(email, resetLink);
      return {message: 'A reset password link has been sent to your email.'}
    }
    catch (e) {
      handleError(e)
    }
  }
}
