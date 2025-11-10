export class LastLoginValueObject {
  constructor(readonly value?: Date) {}

  static now<T extends typeof LastLoginValueObject>(this: T): InstanceType<T> {
    return new this(new Date(Date.now())) as InstanceType<T>;
  }

  static never<T extends typeof LastLoginValueObject>(
    this: T,
  ): InstanceType<T> {
    return new this(undefined) as InstanceType<T>;
  }

  toPrimitives(): string | undefined {
    return this.value ? this.value.toISOString() : undefined;
  }

  static fromPrimitives<T extends typeof LastLoginValueObject>(
    this: T,
    value: string,
  ): InstanceType<T> {
    return new this(new Date(value)) as InstanceType<T>;
  }
}
