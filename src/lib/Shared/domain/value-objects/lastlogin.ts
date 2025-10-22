export class LastLoginValueObject {
  constructor(readonly value?: Date) {}

  static now() {
    return new LastLoginValueObject(new Date(Date.now()));
  }

  static never() {
    return new LastLoginValueObject(undefined);
  }

  toPrimitives(): string {
    return this.value ? this.value.toISOString() : undefined;
  }

  static fromPrimitives(value: string): LastLoginValueObject {
    return new LastLoginValueObject(new Date(value));
  }
}
