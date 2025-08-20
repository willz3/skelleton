export interface IHasher {
  hash(value: string, salt: number): Promise<string>;
}
