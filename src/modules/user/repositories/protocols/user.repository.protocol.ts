import { User } from '@/models';

export interface IUserRepository {
  findByUuid(uuid: string): Promise<User>;
}
