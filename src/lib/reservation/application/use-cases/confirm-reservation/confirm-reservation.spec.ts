import { ConfirmReservationUseCase } from './confirm-reservation';
import { CreateReservationUseCase } from '../create-reservation/create-reservation';

import {
  ReservationId,
  ReservationRepositoryPort,
  ReservationResponse,
} from '~/lib/reservation/domain';
import { ReservationRepositoryInMemoryAdapter } from '~/lib/reservation/infrastructure/adapters';
import { HttpError } from '~/lib/shared/domain';

describe('Confirm reservation - Use Case', () => {
  let repository: ReservationRepositoryPort;
  let create: CreateReservationUseCase;
  let confirm: ConfirmReservationUseCase;
  let reservationCreated: ReservationResponse;

  beforeEach(async () => {
    repository = new ReservationRepositoryInMemoryAdapter();
    create = new CreateReservationUseCase(repository);
    confirm = new ConfirmReservationUseCase(repository);

    const checkInDate = new Date(Date.now() + 9999999);
    const checkOutDate = new Date(checkInDate.getTime() + 9999999);

    reservationCreated = await create.execute({
      hotelId: 'hotel-id',
      userId: 'user-id',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
  });

  it('should confirm reservation', async () => {
    await confirm.execute({
      paymentId: 'payment-id',
      reservationId: reservationCreated.reservationId,
    });

    const result = await repository.getOneByReservationId(
      new ReservationId(reservationCreated.reservationId),
    );

    expect(result).toBeTruthy();
    expect(result?.status.value).toBe('CONFIRMED');
  });

  it('should throw an error when reservation not found', async () => {
    await expect(
      confirm.execute({
        paymentId: 'payment-id',
        reservationId: 'xxxxx',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('should throw an error when reservation not found', async () => {
    await repository.cancel(
      new ReservationId(reservationCreated.reservationId),
    );

    await expect(
      confirm.execute({
        paymentId: 'payment-id',
        reservationId: reservationCreated.reservationId,
      }),
    ).rejects.toThrow(HttpError);
  });
});
