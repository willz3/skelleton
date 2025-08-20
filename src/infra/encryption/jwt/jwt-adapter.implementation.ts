import { ConfigDate } from '@/core/shared/utils';
import { IDecrypter } from '../protocols/decrypter.protocol';
import { IEncrypter } from '../protocols/encrypter.protocol';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '@/infra/config';

export class JwtAdapter
  implements
    IEncrypter<JWTBody, EncrypterOptions>,
    IDecrypter<DecrypterOptions, TokenPayload>
{
  private readonly config: JWTProps;

  constructor() {
    this.config = {
      secretKey: jwtConfig.secretKey,
      publicKey: jwtConfig.publicKey,
      options: {
        algorithm: jwtConfig.defaultOptions.algorithm as Algorithm,
        expiresIn: jwtConfig.defaultOptions.expiresIn as ConfigDate,
      },
    };
  }

  async encrypt(value: JWTBody, options: EncrypterOptions): Promise<string> {
    return jwt.sign(value || {}, this.config.secretKey, {
      expiresIn:
        (options.expiresIn as ConfigDate) || this.config.options.expiresIn,
      algorithm: this.config.options.algorithm,
    });
  }

  async decrypt(cipherText: string): Promise<TokenPayload> {
    try {
      const decoded = await jwt.verify(cipherText, this.config.secretKey);
      return decoded;
    } catch (error) {
      return undefined;
    }
  }
}

type JWTBody = { [key: string]: unknown };
type Algorithm = 'HS256' | 'RS256' | 'none';
type TokenPayload = jwt.JwtPayload | string | undefined;
type DecrypterOptions = void;
type EncrypterOptions = { expiresIn: ConfigDate };

type JWTProps = {
  secretKey: string;
  publicKey: string;
  options: {
    algorithm: Algorithm;
    expiresIn: ConfigDate;
  };
};
