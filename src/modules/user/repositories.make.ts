import { Provider } from '@nestjs/common';
import { PrismaProvider } from '@/infra/db/prisma/prisma.provider';
import { PrismaUserRepository } from './repositories/implementation/prisma';

const repositories: Provider[] = [
  {
    provide: 'UserRepository',
    useFactory: (prisma: PrismaProvider) => new PrismaUserRepository(prisma),
    inject: [PrismaProvider],
  },
];

export { repositories };
