import { Type } from '@nestjs/common';
import { GetUserByUuidController } from './use-cases/get-user-by-uuid/controller';

const controllers: Type<any>[] = [
  //Path routes must be in the end of the array
  GetUserByUuidController,
];

export { controllers };
