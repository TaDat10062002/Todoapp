import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus, Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import { RegisterUserDto } from './dto/regiser-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateCredentials } from './dto/update-credentials.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto)  {
    return this.userService.register(registerUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }

  @UseGuards(AuthGuard)
  @Get('my-profile')
  async getProfile(@Req() req:any) {
    return this.userService.getProfile(req);
  }

  @UseGuards(AuthGuard)
  @Put('update-profile')
  async updateProfile(
    @Req() req:any,
    @Body() dto: UpdateProfileDto
  )  {
    return this.userService.updateProfile(req, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('update-credentials')
  async updateCredentials (
    @Req() req: any,
    @Body() dto: UpdateCredentials
  ) {
      return this.userService.updateCredentials(req, dto)
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.userService.forgotPassword(dto)
  }
}
