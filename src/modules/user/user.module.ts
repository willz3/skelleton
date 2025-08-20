import { Module } from '@nestjs/common';
import { controllers } from './controllers.make';
import { repositories } from './repositories.make';
import { useCases } from './use-cases.make';
import { PrismaModule } from '@/prisma.module';
import { EncryptionModule } from '@/infra/encryption/encryption.module';
import { HttpModule } from '@/infra/http/http.module';

@Module({
  imports: [HttpModule.register({}), PrismaModule, EncryptionModule],
  controllers,
  providers: [...repositories, ...useCases],
  exports: [...repositories],
})
export class UserModule {}
