import { PlanValueObject } from './plan';
import { HttpError } from '~/lib/shared/domain';

describe('PlanValueObject', () => {
  describe('create()', () => {
    it('should create FREE plan', () => {
      const plan = PlanValueObject.create('FREE');
      expect(plan.value).toBe('FREE');
    });

    it('should create BASIC plan', () => {
      const plan = PlanValueObject.create('BASIC');
      expect(plan.value).toBe('BASIC');
    });

    it('should create PREMIUM plan', () => {
      const plan = PlanValueObject.create('PREMIUM');
      expect(plan.value).toBe('PREMIUM');
    });

    it('should throw for invalid value', () => {
      expect(() => {
        PlanValueObject.create('GOLD');
      }).toThrow(HttpError);
    });

    it('should throw for empty string', () => {
      expect(() => {
        PlanValueObject.create('');
      }).toThrow(HttpError);
    });
  });

  describe('fromPrimitives()', () => {
    it('should map 0 to FREE', () => {
      const plan = PlanValueObject.fromPrimitives(0);
      expect(plan.value).toBe('FREE');
    });

    it('should map 1 to BASIC', () => {
      const plan = PlanValueObject.fromPrimitives(1);
      expect(plan.value).toBe('BASIC');
    });

    it('should map 2 to PREMIUM', () => {
      const plan = PlanValueObject.fromPrimitives(2);
      expect(plan.value).toBe('PREMIUM');
    });

    it('should throw for invalid primitive', () => {
      expect(() => {
        PlanValueObject.fromPrimitives(9 as any);
      }).toThrow(HttpError);
    });
  });

  describe('default()', () => {
    it('should return FREE by default', () => {
      const plan = PlanValueObject.default();
      expect(plan.value).toBe('FREE');
    });
  });

  describe('toPrimitives()', () => {
    it('should map FREE to 0', () => {
      const plan = PlanValueObject.create('FREE');
      expect(plan.toPrimitives()).toBe(0);
    });

    it('should map BASIC to 1', () => {
      const plan = PlanValueObject.create('BASIC');
      expect(plan.toPrimitives()).toBe(1);
    });

    it('should map PREMIUM to 2', () => {
      const plan = PlanValueObject.create('PREMIUM');
      expect(plan.toPrimitives()).toBe(2);
    });

    it('should never return undefined', () => {
      const plan = PlanValueObject.create('FREE');
      expect(plan.toPrimitives()).not.toBeUndefined();
    });
  });
});
