import { DynamicModule, Module, Provider } from '@nestjs/common';
import { repositories } from './repositories.make';
import { providers } from './providers.make';
import { EncryptionModule } from '../encryption/encryption.module';
import { PrismaModule } from '@/prisma.module';

@Module({})
export class HttpModule {
  static register(options: any): DynamicModule {
    const allProviders = this.getProviders(providers, options);

    return {
      module: HttpModule,
      imports: [EncryptionModule, PrismaModule],
      providers: [...allProviders, ...repositories],
      exports: [...allProviders, ...repositories],
    };
  }

  private static getProviders(defaultProviders: Provider[], options: any) {
    const providers: Provider[] = [...defaultProviders];

    return providers;
  }
}
