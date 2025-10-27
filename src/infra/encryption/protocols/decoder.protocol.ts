export interface IDecoder<T, U> {
  decode(cipherText: string, options?: T): Promise<U>;
}
