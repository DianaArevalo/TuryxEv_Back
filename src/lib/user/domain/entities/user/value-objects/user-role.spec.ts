import { UserRole } from './user-role';
import { HttpError } from '~/lib/shared/domain';

describe('UserRole Value Object', () => {
  it('should create role with valid value', () => {
    const role = UserRole.create('USER');

    expect(role).toBeInstanceOf(UserRole);
    expect(role.value).toBe('USER');
  });

  it('should throw HttpError when creating with invalid value', () => {
    expect(() => UserRole.create('ADMIN')).toThrow(HttpError);
    expect(() => UserRole.create('')).toThrow(HttpError);
    expect(() => UserRole.create('user')).toThrow(HttpError);
  });

  it('should create role from primitives', () => {
    const role = UserRole.fromPrimitives(0);

    expect(role).toBeInstanceOf(UserRole);
    expect(role.value).toBe('USER');
  });

  it('should throw HttpError when creating from invalid primitive', () => {
    expect(() => UserRole.fromPrimitives(1 as any)).toThrow(HttpError);
    expect(() => UserRole.fromPrimitives(-1 as any)).toThrow(HttpError);
  });

  it('should convert to primitives', () => {
    const role = UserRole.create('USER');

    const primitive = role.toPrimitives();

    expect(primitive).toBe(0);
  });

  it('should throw HttpError when internal value cannot be mapped', () => {
    const fake = new UserRole('USER' as any);

    // forzamos estado inválido
    (fake as any).value = 'ADMIN';

    expect(() => fake.toPrimitives()).toThrow(HttpError);
  });
});
