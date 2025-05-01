import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // Try to connect to the database
    try {
      await this.$connect();
      console.log('Prisma client connected');
    } catch (error) {
      console.error('Failed to connect to the database', error);
      throw error; // Ensure the app doesn't start if Prisma can't connect
    }
  }

  async onModuleDestroy() {
    // Gracefully disconnect Prisma when the module is destroyed
    await this.$disconnect();
    console.log('Prisma client disconnected');
  }
}
