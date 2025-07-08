import {JwtService} from '@nestjs/jwt';

export const createAccessToken = (jwtService: JwtService, payload: any): string  => {
  return jwtService.sign(payload);
}