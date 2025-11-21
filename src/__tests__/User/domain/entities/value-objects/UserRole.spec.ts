import { HttpError } from '~/lib/shared/domain';
import { UserRole } from '~/lib/User/domain/entities/User/value-objects';

describe('UserRole Value Object', () => {
  it('should create a valid role using string', () => {
    const role = UserRole.create('USER');
    expect(role.value).toBe('USER');
  });

  it('should throw ValidationError for invalid string', () => {
    expect(() => UserRole.create('ADMIN')).toThrow(HttpError);
  });

  it('should create a valid role from primitive number', () => {
    const role = UserRole.fromPrimitives(0);
    expect(role.value).toBe('USER');
  });

  it('should throw ValidationError for invalid primitive number', () => {
    // @ts-expect-error: intentionally passing invalid value for test
    expect(() => UserRole.fromPrimitives(2)).toThrow(HttpError);
  });

  it('should convert role to primitive number', () => {
    const role = UserRole.create('USER');
    expect(role.toPrimitives()).toBe(0);
  });
});
