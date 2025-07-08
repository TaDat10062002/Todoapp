import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.';

@Global() // 👈 Cho phép dùng ở mọi nơi mà không cần import thủ công
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
