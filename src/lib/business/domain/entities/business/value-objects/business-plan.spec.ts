import { BusinessPlan } from './business-plan';

import { HttpError } from '~/lib/Shared/domain/exeptions';

describe('BusinessPlan - Value Object', () => {
  describe('create()', () => {
    it('should create FREE', () => {
      const plan = BusinessPlan.create('FREE');
      expect(plan.value).toBe('FREE');
    });

    it('should create BASIC', () => {
      const plan = BusinessPlan.create('BASIC');
      expect(plan.value).toBe('BASIC');
    });

    it('should create PREMIUM', () => {
      const plan = BusinessPlan.create('PREMIUM');
      expect(plan.value).toBe('PREMIUM');
    });

    it('should throw an error for invalid string', () => {
      expect(() => BusinessPlan.create('INVALID')).toThrow(HttpError);
    });
  });

  describe('fromPrimitives()', () => {
    it('should convert 0 → FREE', () => {
      const plan = BusinessPlan.fromPrimitives(0);
      expect(plan.value).toBe('FREE');
    });

    it('should convert 1 → BASIC', () => {
      const plan = BusinessPlan.fromPrimitives(1);
      expect(plan.value).toBe('BASIC');
    });

    it('should convert 2 → PREMIUM', () => {
      const plan = BusinessPlan.fromPrimitives(2);
      expect(plan.value).toBe('PREMIUM');
    });

    it('should throw an error for invalid primitive', () => {
      // @ts-expect-error: intentionally passing invalid value for test
      expect(() => BusinessPlan.fromPrimitives(99)).toThrow(HttpError);
    });
  });

  describe('toPrimitives()', () => {
    it('should map FREE → 0', () => {
      const plan = BusinessPlan.create('FREE');
      expect(plan.toPrimitives()).toBe(0);
    });

    it('should map BASIC → 1', () => {
      const plan = BusinessPlan.create('BASIC');
      expect(plan.toPrimitives()).toBe(1);
    });

    it('should map PREMIUM → 2', () => {
      const plan = BusinessPlan.create('PREMIUM');
      expect(plan.toPrimitives()).toBe(2);
    });
  });
});
