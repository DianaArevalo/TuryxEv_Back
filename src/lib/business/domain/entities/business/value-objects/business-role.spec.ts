import { BusinessRole } from './business-role';

import { HttpError } from '~/lib/shared/domain/exeptions';

describe('BusinessRole - Value Object', () => {
  describe('create()', () => {
    it('should create BUSINESS', () => {
      const role = BusinessRole.create('BUSINESS');
      expect(role.value).toBe('BUSINESS');
    });

    it('should create STAFF', () => {
      const role = BusinessRole.create('STAFF');
      expect(role.value).toBe('STAFF');
    });

    it('should throw an error for invalid string', () => {
      expect(() => BusinessRole.create('INVALID')).toThrow(HttpError);
    });
  });

  describe('fromPrimitives()', () => {
    it('should convert 0 → BUSINESS', () => {
      const role = BusinessRole.fromPrimitives(0);
      expect(role.value).toBe('BUSINESS');
    });

    it('should convert 1 → STAFF', () => {
      const role = BusinessRole.fromPrimitives(1);
      expect(role.value).toBe('STAFF');
    });

    it('should throw an error for invalid primitive', () => {
      // @ts-expect-error: intentionally passing invalid value for test
      expect(() => BusinessRole.fromPrimitives(5)).toThrow(HttpError);
    });
  });

  describe('toPrimitives()', () => {
    it('should map BUSINESS → 0', () => {
      const role = BusinessRole.create('BUSINESS');
      expect(role.toPrimitives()).toBe(0);
    });

    it('should map STAFF → 1', () => {
      const role = BusinessRole.create('STAFF');
      expect(role.toPrimitives()).toBe(1);
    });

    it('should throw an error if internal value is invalid', () => {
      // @ts-expect-error: intentionally passing invalid value for test
      const role = new BusinessRole('INVALID');
      expect(() => role.toPrimitives()).toThrow(HttpError);
    });
  });
});
