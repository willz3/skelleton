import { Module } from '@nestjs/common';
import { EncryptionModule } from './infra/encryption/encryption.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule.register({}), EncryptionModule],
  controllers: [],
  providers: [],
})
export class MicroserviceCoreBankingModule {}
