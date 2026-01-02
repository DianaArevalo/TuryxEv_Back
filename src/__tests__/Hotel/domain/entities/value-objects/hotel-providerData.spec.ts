import { ProviderDataValueObject } from "../../../../../lib/Shared/domain";


describe('Hotel/domain/value-objects/hotel-providerData', () => {
  it('should create from primitives', () => {
    const provider = ProviderDataValueObject.fromPrimitives(0);

    expect(provider.value).toBe('AUTH');
  });

  it('should convert to primitives', () => {
    const provider = ProviderDataValueObject.create('AUTHGOOGLE');

    expect(provider.toPrimitives()).toBe(1);
  });

  it('should throw error for invalid primitive', () => {
    expect(() =>
      ProviderDataValueObject.fromPrimitives(99 as any),
    ).toThrow();
  });

  it('should throw error for invalid value', () => {
    expect(() =>
      ProviderDataValueObject.create('INVALID'),
    ).toThrow();
  });
});
