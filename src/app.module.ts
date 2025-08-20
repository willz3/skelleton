import { Module } from '@nestjs/common';
import { EncryptionModule } from './infra/encryption/encryption.module';
import { HttpModule } from './infra/http/http.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [HttpModule.register({}), UserModule, EncryptionModule],
  controllers: [],
  providers: [],
})
export class MicroserviceCoreBankingModule {}
