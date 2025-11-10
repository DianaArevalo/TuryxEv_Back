import { ReservationPaymentId } from '~/lib/Reservation/domain';

describe('Reservation/domain/value-objects/ReservationPaymentId', () => {
  it('should create a ReservationPaymentId with a string value', () => {
    const paymentId = new ReservationPaymentId('pay-789');

    expect(paymentId).toBeInstanceOf(ReservationPaymentId);
    expect(paymentId.value).toBe('pay-789');
  });
});
