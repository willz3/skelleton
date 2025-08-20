import { Module } from '@nestjs/common';
import { JwtAdapter } from './jwt/jwt-adapter.implementation';
import { BcryptAdapter } from './bcrypt';

@Module({
  providers: [
    {
      provide: 'JwtAdapter',
      useClass: JwtAdapter,
    },
    {
      provide: 'BcryptAdapter',
      useClass: BcryptAdapter,
    },
  ],
  exports: ['JwtAdapter', 'BcryptAdapter'],
})
export class EncryptionModule {}
