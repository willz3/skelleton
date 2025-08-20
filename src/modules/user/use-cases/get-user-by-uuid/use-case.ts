import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/modules/user/repositories/protocols';
import {
  IGetUserByUuidUseCase,
  GetUserByUuidUseCaseParams,
  GetUserByUuidUseCaseResult,
} from './types';
import { left, right } from '@core/shared/logic/either';
import { UserNotFoundError } from '@/shared/errors';

@Injectable()
export class GetUserByUuidUseCase implements IGetUserByUuidUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    params: GetUserByUuidUseCaseParams,
  ): Promise<GetUserByUuidUseCaseResult> {
    const user = await this.userRepository.findByUuid(params.uuid);

    if (!user) {
      return left(new UserNotFoundError());
    }

    return right(user);
  }
}
