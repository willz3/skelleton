import * as jwt from 'jsonwebtoken';
import { ConfigDate } from '@/core/shared/utils';
import { IDecrypter } from '../protocols/decrypter.protocol';
import { IEncrypter } from '../protocols/encrypter.protocol';
import { jwtConfig } from '@/infra/config';
import { IDecoder } from '../protocols/decoder.protocol';

export class JwtAdapter
  implements
    IEncrypter<JWTBody, EncrypterOptions>,
    IDecrypter<DecrypterOptions, TokenPayload>,
    IDecoder<DecoderOptions, TokenPayload>
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
  async decode(
    cipherText: string,
    options?: DecoderOptions,
  ): Promise<TokenPayload> {
    const decoded = await jwt.decode(cipherText, {
      complete: options?.complete,
    });
    return decoded;
  }

  async encrypt(value: JWTBody, options: EncrypterOptions): Promise<string> {
    return jwt.sign(value || {}, this.config.secretKey, {
      expiresIn:
        (options.expiresIn as ConfigDate) || this.config.options.expiresIn,
      algorithm: this.config.options.algorithm,
    });
  }

  async decrypt(
    cipherText: string,
    options?: DecrypterOptions,
  ): Promise<TokenPayload> {
    try {
      const decoded = await jwt.verify(cipherText, this.config.secretKey, {
        algorithms: [options?.algorithm],
        audience: options?.audience,
        issuer: options?.issuer,
      });
      return decoded;
    } catch (error) {
      return undefined;
    }
  }
}

type JWTBody = { [key: string]: unknown };
type Algorithm = 'HS256' | 'RS256' | 'none';
type TokenPayload = jwt.JwtPayload | string | undefined;
type DecrypterOptions = {
  algorithm: Algorithm;
  audience: string;
  issuer: string;
};
type EncrypterOptions = { expiresIn: ConfigDate };
type DecoderOptions = { complete: boolean };

type JWTProps = {
  secretKey: string;
  publicKey: string;
  options: {
    algorithm: Algorithm;
    expiresIn: ConfigDate;
  };
};
