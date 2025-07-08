import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000', // hoặc ['http://localhost:3000', 'https://yourdomain.com']
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // ❗️ tự động bỏ các field không khai báo trong DTO
      forbidNonWhitelisted: true, // ❗️ nếu client gửi field thừa thì báo lỗi
      transform: true       // ❗️ tự chuyển đổi kiểu dữ liệu (string → number...)
    }),
  )

  await app.listen(process.env.PORT || '3000');
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
}
bootstrap();
