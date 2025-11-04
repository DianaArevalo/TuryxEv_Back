import { ValidationError } from "../exeptions";

export class CreatedAtValueObject {
  constructor(readonly value: Date) {}

  static create<T extends typeof CreatedAtValueObject>(
    this: T,
    value: Date
  ): InstanceType<T> {
    const now = new Date();
    const toleranceMs = 1000; // 1 segundo de margen

    if (!value) throw new ValidationError("CreatedAt no puede ser nulo");
    if (isNaN(value.getTime())) throw new ValidationError("CreatedAt inválido");
    if (value.getTime() > now.getTime() + toleranceMs)
      throw new ValidationError("CreatedAt no puede estar en el futuro");

    return new this(value) as InstanceType<T>;
  }

  static now<T extends typeof CreatedAtValueObject>(this: T): InstanceType<T> {
    return new this(new Date()) as InstanceType<T>;
  }

  toPrimitives(): Date {
    return this.value;
  }
}
