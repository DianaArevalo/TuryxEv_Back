import { StringValueObject } from './string';
import { HttpError } from '../exeptions';

describe('StringValueObject', () => {
  it('should create a valid string value object', () => {
    const vo = StringValueObject.create('hello');
    expect(vo.value).toBe('hello');
  });

  it('should allow whitespace strings (length > 0)', () => {
    expect(() => {
      StringValueObject.create('   ');
    }).toThrow(HttpError);
  });

  it('should throw if string is empty', () => {
    expect(() => {
      StringValueObject.create('');
    }).toThrow(HttpError);
  });
});
