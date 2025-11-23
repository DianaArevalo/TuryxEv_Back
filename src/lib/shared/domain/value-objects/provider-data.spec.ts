import { HttpError } from '../exeptions';
import { ProviderDataValueObject } from './provider-data';

describe('ProviderDataValueObject', () => {
  describe('create()', () => {
    it('should create AUTH', () => {
      const vo = ProviderDataValueObject.create('AUTH');
      expect(vo.value).toBe('AUTH');
    });

    it('should create AUTHGOOGLE', () => {
      const vo = ProviderDataValueObject.create('AUTHGOOGLE');
      expect(vo.value).toBe('AUTHGOOGLE');
    });

    it('should create AUTHFACEBOOK', () => {
      const vo = ProviderDataValueObject.create('AUTHFACEBOOK');
      expect(vo.value).toBe('AUTHFACEBOOK');
    });

    it('should throw error for invalid value', () => {
      expect(() => {
        ProviderDataValueObject.create('TWITTER');
      }).toThrow(HttpError);
    });

    it('should throw error for empty string', () => {
      expect(() => {
        ProviderDataValueObject.create('');
      }).toThrow(HttpError);
    });
  });

  describe('fromPrimitives()', () => {
    it('should map 0 to AUTH', () => {
      const vo = ProviderDataValueObject.fromPrimitives(0);
      expect(vo.value).toBe('AUTH');
    });

    it('should map 1 to AUTHGOOGLE', () => {
      const vo = ProviderDataValueObject.fromPrimitives(1);
      expect(vo.value).toBe('AUTHGOOGLE');
    });

    it('should map 2 to AUTHFACEBOOK', () => {
      const vo = ProviderDataValueObject.fromPrimitives(2);
      expect(vo.value).toBe('AUTHFACEBOOK');
    });

    it('should throw error for invalid primitive', () => {
      expect(() => {
        ProviderDataValueObject.fromPrimitives(5 as any);
      }).toThrow(HttpError);
    });
  });

  describe('toPrimitives()', () => {
    it('should map AUTH to 0', () => {
      const vo = ProviderDataValueObject.create('AUTH');
      expect(vo.toPrimitives()).toBe(0);
    });

    it('should map AUTHGOOGLE to 1', () => {
      const vo = ProviderDataValueObject.create('AUTHGOOGLE');
      expect(vo.toPrimitives()).toBe(1);
    });

    it('should map AUTHFACEBOOK to 2', () => {
      const vo = ProviderDataValueObject.create('AUTHFACEBOOK');
      expect(vo.toPrimitives()).toBe(2);
    });
  });
});
