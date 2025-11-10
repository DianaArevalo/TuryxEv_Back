import { HotelStatus } from '~/lib/Hotel/domain';

describe('Hotel/domain/value-objects/hotel-status', () => {
  it('should create from a valid string value', () => {
    const status = HotelStatus.create('OPEN');
    expect(status.getValue()).toBe('OPEN');
  });

  it('should create from valid primitive value', () => {
    const status = HotelStatus.fromPrimitives(1);
    expect(status.getValue()).toBe('CLOSED');
  });

  it('should throw error for invalid string value', () => {
    // @ts-expect-error: intentionally passing invalid value for test
    expect(() => HotelStatus.create('INVALID_STATUS')).toThrow(
      'Invalid status: INVALID_STATUS',
    );
  });

  it('should throw error for invalid primitive value', () => {
    expect(() => HotelStatus.fromPrimitives(5 as 0 | 1 | 2)).toThrow(
      'Invalid value: 5',
    );
  });

  it('should convert to primitive correctly', () => {
    const status = HotelStatus.create('BLOCKED');
    expect(status.toPrimitives()).toBe(2);
  });
});
