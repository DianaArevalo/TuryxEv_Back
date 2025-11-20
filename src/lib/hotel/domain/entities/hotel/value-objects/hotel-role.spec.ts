import { HttpError } from '~/lib/Shared/domain/exeptions';
import { HotelRole } from './hotel-role';

describe('HotelRole - Value Object', () => {
  describe('create()', () => {
    it('should create HOTEL', () => {
      const role = HotelRole.create('HOTEL');
      expect(role.value).toBe('HOTEL');
    });

    it('should create STAFF', () => {
      const role = HotelRole.create('STAFF');
      expect(role.value).toBe('STAFF');
    });

    it('should throw an error for invalid string', () => {
      expect(() => HotelRole.create('INVALID')).toThrow(HttpError);
    });
  });

  describe('fromPrimitives()', () => {
    it('should convert 0 → HOTEL', () => {
      const role = HotelRole.fromPrimitives(0);
      expect(role.value).toBe('HOTEL');
    });

    it('should convert 1 → STAFF', () => {
      const role = HotelRole.fromPrimitives(1);
      expect(role.value).toBe('STAFF');
    });

    it('should throw an error for invalid primitive', () => {
      // @ts-expect-error: intentionally passing invalid value for test
      expect(() => HotelRole.fromPrimitives(5)).toThrow(HttpError);
    });
  });

  describe('toPrimitives()', () => {
    it('should map HOTEL → 0', () => {
      const role = HotelRole.create('HOTEL');
      expect(role.toPrimitives()).toBe(0);
    });

    it('should map STAFF → 1', () => {
      const role = HotelRole.create('STAFF');
      expect(role.toPrimitives()).toBe(1);
    });

    it('should throw an error if internal value is invalid', () => {
      // @ts-expect-error: intentionally passing invalid value for test
      const role = new HotelRole('INVALID');
      expect(() => role.toPrimitives()).toThrow(HttpError);
    });
  });
});
