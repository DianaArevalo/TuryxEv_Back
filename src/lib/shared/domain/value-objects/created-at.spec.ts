import { CreatedAtValueObject } from './created-at';
import { HttpError } from '../exeptions';

describe('CreatedAtValueObject', () => {
  it('should create a valid date', () => {
    const date = new Date();

    const result = CreatedAtValueObject.create(date);

    expect(result).toBeInstanceOf(CreatedAtValueObject);
    expect(result.value).toEqual(date);
  });

  it('should throw HttpError if value is null', () => {
    expect(() => CreatedAtValueObject.create(null as any)).toThrow(HttpError);
  });

  it('should throw HttpError if value is invalid date', () => {
    const invalid = new Date('invalid-date');

    expect(() => CreatedAtValueObject.create(invalid)).toThrow(HttpError);
  });

  it('should throw HttpError if date is in the future', () => {
    const future = new Date(Date.now() + 5000);

    expect(() => CreatedAtValueObject.create(future)).toThrow(HttpError);
  });

  it('should allow small future tolerance (1 second)', () => {
    const tolerated = new Date(Date.now() + 500);

    const result = CreatedAtValueObject.create(tolerated);

    expect(result.value.getTime()).toBe(tolerated.getTime());
  });

  it('should create date using now()', () => {
    const result = CreatedAtValueObject.now();

    expect(result).toBeInstanceOf(CreatedAtValueObject);
    expect(result.value).toBeInstanceOf(Date);
  });

  it('should return instance of subclass when using generic create()', () => {
    class CustomCreatedAt extends CreatedAtValueObject {}

    const date = new Date();
    const result = CustomCreatedAt.create(date);

    expect(result).toBeInstanceOf(CustomCreatedAt);
  });

  it('should return instance of subclass when using now()', () => {
    class CustomCreatedAt extends CreatedAtValueObject {}

    const result = CustomCreatedAt.now();

    expect(result).toBeInstanceOf(CustomCreatedAt);
  });
});
