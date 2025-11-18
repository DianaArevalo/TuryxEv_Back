import { ReservationStatus } from './reservation-status';

describe('ReservationStatus - Value Object', () => {
  test('should create with default value PENDING', () => {
    const status = ReservationStatus.create();
    expect(status.value).toBe('PENDING');
  });

  test('should create with a valid provided status', () => {
    const status = ReservationStatus.create('CONFIRMED');
    expect(status.value).toBe('CONFIRMED');
  });

  test('should convert status to primitives correctly', () => {
    expect(ReservationStatus.create('PENDING').toPrimitives()).toBe(0);
    expect(ReservationStatus.create('CONFIRMED').toPrimitives()).toBe(1);
    expect(ReservationStatus.create('CANCELLED').toPrimitives()).toBe(2);
  });

  test('should create from valid primitive values', () => {
    expect(ReservationStatus.fromPrimitives(0).value).toBe('PENDING');
    expect(ReservationStatus.fromPrimitives(1).value).toBe('CONFIRMED');
    expect(ReservationStatus.fromPrimitives(2).value).toBe('CANCELLED');
  });

  test('should throw when creating from invalid primitive value', () => {
    expect(() => ReservationStatus.fromPrimitives(3)).toThrow(
      'ReservationStatus inválido: 3',
    );
  });
});
