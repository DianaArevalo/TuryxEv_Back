import { ValidationError } from '../exeptions';

const minLength = 8;
const checkerHasUppercase = /[A-Z]/;
const checkerHasLowercase = /[a-z]/;
const checkerHasNumber = /\d/;
const checkerHasSymbol = /[!@#$%^&*(),.?":{}|<>]/;

export class PasswordValueObject {
  constructor(readonly value: string) {}

  static create<T extends typeof PasswordValueObject>(
    this: T,
    value: string,
  ): InstanceType<T> {
    if (value.length < minLength)
      throw new ValidationError(
        'The password must be at least 8 characters long',
      );
    else if (!checkerHasUppercase.test(value))
      throw new ValidationError(
        'The password must contain at least one uppercase letter',
      );
    else if (!checkerHasLowercase.test(value))
      throw new ValidationError(
        'The password must contain at least one lowercase letter',
      );
    else if (!checkerHasNumber.test(value))
      throw new ValidationError(
        'The password must contain at least one number',
      );
    else if (!checkerHasSymbol.test(value))
      throw new ValidationError(
        'The password must contain at least one special character',
      );

    return new this(value) as InstanceType<T>;
  }
}
