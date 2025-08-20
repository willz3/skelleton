import { User } from '@/models';

export class UserMapper {
  static toDomain(prismaData: { id: number }): User {
    return {
      id: prismaData.id,
    };
  }
}
