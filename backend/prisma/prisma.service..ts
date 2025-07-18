import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to MySQL via Prisma');
    }
    catch (e) {
      console.error('❌ DB connection failed:', e.message);
    }
  }
}