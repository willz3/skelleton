import { User } from '@/models';
import { PrismaProvider } from '@/infra/db/prisma/prisma.provider';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/modules/user/repositories/protocols';
import { UserMapper } from '@/modules/user/mappers';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  async findByUuid(uuid: string): Promise<User> {
    // const user = await this.prisma.user.findUnique({
    //   where: { uuid },
    // });

    return UserMapper.toDomain({
      id: 1,
    });
  }
}
