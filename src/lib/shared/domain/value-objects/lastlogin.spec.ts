import { LastLoginValueObject } from './lastlogin';

describe('LastLoginValueObject', () => {
  it('should create current date with now()', () => {
    const result = LastLoginValueObject.now();

    expect(result).toBeInstanceOf(LastLoginValueObject);
    expect(result.value).toBeInstanceOf(Date);
  });

  it('should create undefined value with never()', () => {
    const result = LastLoginValueObject.never();

    expect(result).toBeInstanceOf(LastLoginValueObject);
    expect(result.value).toBeUndefined();
  });

  it('should convert date to ISO string with toPrimitives()', () => {
    const date = new Date('2024-01-01T10:00:00.000Z');
    const vo = new LastLoginValueObject(date);

    const result = vo.toPrimitives();

    expect(result).toBe(date.toISOString());
  });

  it('should return undefined in toPrimitives when value is undefined', () => {
    const vo = new LastLoginValueObject(undefined);

    const result = vo.toPrimitives();

    expect(result).toBeUndefined();
  });

  it('should create instance from primitives', () => {
    const iso = '2024-01-01T10:00:00.000Z';

    const result = LastLoginValueObject.fromPrimitives(iso);

    expect(result).toBeInstanceOf(LastLoginValueObject);
    expect(result.value).toBeInstanceOf(Date);
    expect(result.value?.toISOString()).toBe(iso);
  });

  it('should support subclassing in now()', () => {
    class CustomLastLogin extends LastLoginValueObject {}

    const result = CustomLastLogin.now();

    expect(result).toBeInstanceOf(CustomLastLogin);
  });

  it('should support subclassing in never()', () => {
    class CustomLastLogin extends LastLoginValueObject {}

    const result = CustomLastLogin.never();

    expect(result).toBeInstanceOf(CustomLastLogin);
  });

  it('should support subclassing in fromPrimitives()', () => {
    class CustomLastLogin extends LastLoginValueObject {}

    const result = CustomLastLogin.fromPrimitives('2024-01-01T10:00:00.000Z');

    expect(result).toBeInstanceOf(CustomLastLogin);
  });
});
