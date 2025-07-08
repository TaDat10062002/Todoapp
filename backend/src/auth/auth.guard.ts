
import {
  CanActivate,
  ExecutionContext,
  Injectable, NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service.';
import { handleError } from '../common/utils/error.handler';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      const user = await this.prisma.user.findUnique({
        where : {
          id: payload.sub
        }
      })

      const oldTokenTime = new Date(payload.iat * 1000);
      if(!user) throw new NotFoundException();
      const newTokenTime = user.passwordChangedAt;
      // so sanh neu ma tgian jwt < tgian passwordChangedAt trong db token chet
      if(newTokenTime && oldTokenTime < newTokenTime){
        throw new UnauthorizedException({
          message: 'Token is no longer valid because password was changed',
        });
      }
      
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch(err) {
      handleError(err)
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
