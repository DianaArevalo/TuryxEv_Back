import { HttpError } from '../exeptions';
import { LimitValueObject } from './limit';

describe('LimitValueObject', () => {
  test('should use default value when undefined', () => {
    const obj = LimitValueObject.create();
    expect(obj.value).toBe(20);
  });

  test('should accept a valid number', () => {
    const obj = LimitValueObject.create(50);
    expect(obj.value).toBe(50);
  });

  test('should accept a valid numeric string', () => {
    const obj = LimitValueObject.create('10');
    expect(obj.value).toBe(10);
  });

  test('should throw if value is not an integer', () => {
    expect(() => {
      LimitValueObject.create(10.5);
    }).toThrow(HttpError);
  });

  test('should throw if value is <= 0', () => {
    expect(() => {
      LimitValueObject.create(0);
    }).toThrow(HttpError);
  });

  test('should throw if value is greater than 1000', () => {
    expect(() => {
      LimitValueObject.create(1001);
    }).toThrow(HttpError);
  });

  test('should throw if value is not a number string', () => {
    expect(() => {
      LimitValueObject.create('abc');
    }).toThrow(HttpError);
  });
});
