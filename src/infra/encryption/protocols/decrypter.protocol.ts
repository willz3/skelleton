export interface IDecrypter<T, U> {
  decrypt(cipherText: string, options?: T): Promise<U>;
}
