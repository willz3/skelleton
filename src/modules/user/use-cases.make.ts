import { Provider } from '@nestjs/common';
import { GetUserByUuidUseCase } from './use-cases/get-user-by-uuid/use-case';

export const useCases: Provider[] = [
  {
    provide: 'GetUserByUuidUseCase',
    useClass: GetUserByUuidUseCase,
  },
];
