import { HotelProviderData } from '~/lib/Hotel/domain';

describe('Hotel/domain/value-objects/hotel-providerData', () => {
  it('should create from primitives', () => {
    const provider = HotelProviderData.fromPrimitives(0);
    expect(provider.value).toBe('AUTH');
  });

  it('should create from valid string value', () => {
    const provider = HotelProviderData.create('AUTH');
    expect(provider.value).toBe('AUTH');
  });

  it('should throw error when value is invalid string', () => {
    // @ts-expect-error: intentionally passing invalid value for test
    expect(() => HotelProviderData.create('ANY PROVIDER')).toThrow(
      'Invalid value: ANY PROVIDER',
    );
  });

  it('should throw error when primitive value is invalid number', () => {
    expect(() => HotelProviderData.fromPrimitives(5 as 0 | 1 | 2)).toThrow(
      'Invalid value: 5',
    );
  });
});
