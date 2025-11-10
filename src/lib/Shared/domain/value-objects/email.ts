import { ValidationError } from '../exeptions';

const checker =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export class EmailValueObject {
  constructor(readonly value: string) {}

  // Adaptado de https://github.com/manishsaraan/email-validator/blob/master/index.js
  static create<T extends typeof EmailValueObject>(
    this: T,
    value: string,
  ): InstanceType<T> {
    const err = new ValidationError('The email provided is invalid.');

    if (!value) throw err;

    const splitted = value.split('@');

    if (splitted.length !== 2) throw err;

    const account = splitted[0];
    const domain = splitted[1];

    if (account.length > 64) throw err;
    else if (domain.length > 255) throw err;

    const domainSplitted = domain.split('.');

    if (domainSplitted.some((it) => it.length > 63)) throw err;

    if (!checker.test(value)) throw err;

    return new this(value) as InstanceType<T>;
  }
}
