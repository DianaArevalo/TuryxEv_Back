import { EmailValueObject } from './email';
import { HttpError } from '../exeptions';

describe('EmailValueObject', () => {
  it('should create a valid email', () => {
    const email = EmailValueObject.create('test@example.com');

    expect(email).toBeInstanceOf(EmailValueObject);
    expect(email.value).toBe('test@example.com');
  });

  it('should throw HttpError when value is empty', () => {
    expect(() => EmailValueObject.create('')).toThrow(HttpError);
  });

  it('should throw HttpError when missing @ symbol', () => {
    expect(() => EmailValueObject.create('invalid-email')).toThrow(HttpError);
  });

  it('should throw HttpError when having multiple @', () => {
    expect(() => EmailValueObject.create('a@b@c.com')).toThrow(HttpError);
  });

  it('should throw HttpError when local part is too long (>64)', () => {
    const longAccount = 'a'.repeat(65) + '@test.com';

    expect(() => EmailValueObject.create(longAccount)).toThrow(HttpError);
  });

  it('should throw HttpError when domain is too long (>255)', () => {
    const longDomain = 'a'.repeat(256) + '.com';
    const email = 'test@' + longDomain;

    expect(() => EmailValueObject.create(email)).toThrow(HttpError);
  });

  it('should throw HttpError when a domain section is too long (>63)', () => {
    const longPart = 'a'.repeat(64);
    const email = `test@${longPart}.com`;

    expect(() => EmailValueObject.create(email)).toThrow(HttpError);
  });

  it('should throw HttpError when regex fails', () => {
    expect(() => EmailValueObject.create('test@.com')).toThrow(HttpError);
  });

  it('should support subclass creation', () => {
    class CustomEmail extends EmailValueObject {}

    const email = CustomEmail.create('custom@example.com');

    expect(email).toBeInstanceOf(CustomEmail);
    expect(email.value).toBe('custom@example.com');
  });
});
