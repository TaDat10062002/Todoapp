import { BaseAuthDto } from './base-auth.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto extends BaseAuthDto{
  @IsNotEmpty()
  fullName: string;
}