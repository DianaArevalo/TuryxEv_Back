import { BusinessStatus } from './business-status';

import { HttpError } from '~/lib/shared/domain';

describe('BusinessStatus', () => {
  describe('create', () => {
    it('crea correctamente con valores válidos', () => {
      expect(BusinessStatus.create('OPEN').value).toBe('OPEN');
      expect(BusinessStatus.create('CLOSED').value).toBe('CLOSED');
      expect(BusinessStatus.create('BLOCKED').value).toBe('BLOCKED');
    });

    it('lanza error con valores inválidos', () => {
      expect(() => BusinessStatus.create('INVALID')).toThrow(HttpError);
      expect(() => BusinessStatus.create('')).toThrow(HttpError);
      expect(() => BusinessStatus.create('open')).toThrow(HttpError);
    });
  });

  describe('fromPrimitives', () => {
    it('convierte correctamente valores numéricos válidos', () => {
      expect(BusinessStatus.fromPrimitives(0).value).toBe('OPEN');
      expect(BusinessStatus.fromPrimitives(1).value).toBe('CLOSED');
      expect(BusinessStatus.fromPrimitives(2).value).toBe('BLOCKED');
    });

    it('lanza error con valores numéricos inválidos', () => {
      // @ts-expect-error: intentionally passing invalid value for test
      expect(() => BusinessStatus.fromPrimitives(3)).toThrow(HttpError);
      // @ts-expect-error: intentionally passing invalid value for test
      expect(() => BusinessStatus.fromPrimitives(-1)).toThrow(HttpError);
    });
  });

  describe('toPrimitives', () => {
    it('retorna correctamente los valores primitivos', () => {
      expect(BusinessStatus.create('OPEN').toPrimitives()).toBe(0);
      expect(BusinessStatus.create('CLOSED').toPrimitives()).toBe(1);
      expect(BusinessStatus.create('BLOCKED').toPrimitives()).toBe(2);
    });
  });
});
