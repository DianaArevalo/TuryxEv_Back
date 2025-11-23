import { NameValueObject } from './name';
import { HttpError } from '../exeptions';

describe('NameValueObject', () => {
  test('should create a valid name', () => {
    const obj = NameValueObject.create('John Doe');
    expect(obj.value).toBe('John Doe');
  });

  test('should trim and reject empty string', () => {
    expect(() => {
      NameValueObject.create('   ');
    }).toThrow(HttpError);
  });

  test('should throw if value is empty', () => {
    expect(() => {
      NameValueObject.create('');
    }).toThrow(HttpError);
  });

  test('should throw if value is null or undefined', () => {
    expect(() => {
      NameValueObject.create(null as unknown as string);
    }).toThrow(HttpError);

    expect(() => {
      NameValueObject.create(undefined as unknown as string);
    }).toThrow(HttpError);
  });

  test('should throw if name is shorter than 3 characters', () => {
    expect(() => {
      NameValueObject.create('Jo');
    }).toThrow(HttpError);
  });

  test('should allow name with exactly 3 characters', () => {
    const obj = NameValueObject.create('Joe');
    expect(obj.value).toBe('Joe');
  });
});
