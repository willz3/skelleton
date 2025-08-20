export interface IEncrypter<T, U> {
  encrypt(value: T, options?: U): Promise<string>;
}
