import { IsNotEmpty, IsOptional, IsString, IsUrl, MinLength, ValidateIf } from 'class-validator';
import { BaseAuthDto } from './base-auth.dto';

export class UpdateCredentials{
  @ValidateIf(o => o.newPassword !== undefined && o.newPassword !== '')
  @IsNotEmpty({message: 'You need to provide your current password'})
  currentPassword: string;

  @ValidateIf(o => o.currentPassword !== undefined && o.currentPassword !== '')
  @IsNotEmpty({ message: 'This field is required' })
  @MinLength(6, { message: 'Password at least 6 characters' })
  newPassword: string;
}
