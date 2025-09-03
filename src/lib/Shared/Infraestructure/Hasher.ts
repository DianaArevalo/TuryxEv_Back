import argon2 from "argon2";

export class Hasher {
  static async hash(plain: string): Promise<string> {
    return await argon2.hash(plain);
  }

  static async verify(plain: string, hashed: string): Promise<boolean> {
    return await argon2.verify(hashed, plain);
  }
}
