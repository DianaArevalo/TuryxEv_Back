import { CreatedAtValueObject } from './created-at';
import { UpdatedAtValueObject } from './updated-at';
import { HttpError } from '../exeptions';

describe('UpdatedAtValueObject', () => {
  const fixedCreatedAt = CreatedAtValueObject.create(
    new Date('2024-01-01T00:00:00.000Z'),
  );

  it('should create a valid UpdatedAt date', () => {
    const validDate = new Date('2024-01-02T00:00:00.000Z');

    const vo = UpdatedAtValueObject.create(validDate, fixedCreatedAt);

    expect(vo.value).toEqual(validDate);
  });

  it('should create using now()', () => {
    const vo = UpdatedAtValueObject.now(fixedCreatedAt);

    expect(vo.value instanceof Date).toBe(true);
  });

  it('should throw if value is null', () => {
    expect(() => {
      // @ts-expect-error - test invalid input
      UpdatedAtValueObject.create(null, fixedCreatedAt);
    }).toThrow(HttpError);
  });

  it('should throw if value is an invalid date', () => {
    const invalidDate = new Date('invalid');

    expect(() => {
      UpdatedAtValueObject.create(invalidDate, fixedCreatedAt);
    }).toThrow(HttpError);
  });

  it('should throw if date is in the future', () => {
    const futureDate = new Date(Date.now() + 60_000);

    expect(() => {
      UpdatedAtValueObject.create(futureDate, fixedCreatedAt);
    }).toThrow(HttpError);
  });

  it('should throw if date is before createdAt', () => {
    const pastDate = new Date('2023-12-31T23:59:59.000Z');

    expect(() => {
      UpdatedAtValueObject.create(pastDate, fixedCreatedAt);
    }).toThrow(HttpError);
  });

  it('should return primitives correctly', () => {
    const validDate = new Date('2024-01-02T00:00:00.000Z');
    const vo = UpdatedAtValueObject.create(validDate, fixedCreatedAt);

    expect(vo.toPrimitives()).toEqual(validDate);
  });
});
