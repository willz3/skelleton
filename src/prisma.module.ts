import { Module } from '@nestjs/common';
import { PrismaProvider } from './infra/db/prisma/prisma.provider';

@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class PrismaModule {}
