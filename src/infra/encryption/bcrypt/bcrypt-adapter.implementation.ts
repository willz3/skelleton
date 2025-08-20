import { IHasher, IHashComparer } from '../protocols';
import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { bcryptConfig } from '@/infra/config';
@Injectable()
export class BcryptAdapter implements IHasher, IHashComparer {
  private readonly salt: number = bcryptConfig.saltRounds;

  constructor() {}

  async hash(plaintext: string): Promise<string> {
    const digest = await bcrypt.hash(plaintext, this.salt);
    return digest;
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plaintext, digest);
    return isValid;
  }
}
