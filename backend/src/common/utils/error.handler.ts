import {
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

export function handleError(error: unknown) {
  if (error instanceof HttpException) {
    throw error; // lỗi đã chuẩn rồi
  }
  // Lỗi hệ thống như DB, runtime,...
  console.error('Unexpected error:', error);
  throw new InternalServerErrorException('Internal Server Error');
}
