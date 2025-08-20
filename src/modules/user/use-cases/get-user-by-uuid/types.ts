import { IController, IUseCase } from '@core/protocols';
import { Either } from '@core/shared/logic/either';
import { User } from '@/models';

export type GetUserByUuidUseCaseParams = {
  uuid: string;
};

export type GetUserByUuidUseCaseResponse = User;

export type GetUserByUuidUseCaseResult = Either<
  Error,
  GetUserByUuidUseCaseResponse
>;

export interface IGetUserByUuidUseCase
  extends IUseCase<GetUserByUuidUseCaseParams, GetUserByUuidUseCaseResult> {}

export interface IGetUserByUuidController extends IController<string> {}
