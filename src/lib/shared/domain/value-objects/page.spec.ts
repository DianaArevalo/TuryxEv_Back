import { PageValueObject } from './page';
import { HttpError } from '../exeptions';

describe('PageValueObject', () => {
  it('should return default page when value is undefined', () => {
    const vo = PageValueObject.create();
    expect(vo.value).toBe(1);
  });

  it('should return default page when value is null', () => {
    // @ts-expect-error: intentionally passing an optional value for test
    const vo = PageValueObject.create(null);
    expect(vo.value).toBe(1);
  });

  it('should create a valid page from number', () => {
    const vo = PageValueObject.create(3);
    expect(vo.value).toBe(3);
  });

  it('should create a valid page from string', () => {
    const vo = PageValueObject.create('5');
    expect(vo.value).toBe(5);
  });

  it('should throw if value is 0', () => {
    expect(() => {
      PageValueObject.create(0);
    }).toThrow(HttpError);
  });

  it('should throw if value is negative', () => {
    expect(() => {
      PageValueObject.create(-1);
    }).toThrow(HttpError);
  });

  it('should throw if value is not an integer', () => {
    expect(() => {
      PageValueObject.create(1.5);
    }).toThrow(HttpError);
  });

  it('should throw if value is not a number', () => {
    expect(() => {
      PageValueObject.create('abc');
    }).toThrow(HttpError);
  });
});
