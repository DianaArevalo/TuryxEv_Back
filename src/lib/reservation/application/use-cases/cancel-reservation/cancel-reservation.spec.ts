import { CancelReservationUseCase } from './cancel-reservation';
import { CreateReservationUseCase } from '../create-reservation/create-reservation';

import {
  ReservationId,
  ReservationPaymentId,
  ReservationRepositoryPort,
  ReservationResponse,
} from '~/lib/reservation/domain';
import { ReservationRepositoryInMemoryAdapter } from '~/lib/reservation/infrastructure/adapters';
import { HttpError } from '~/lib/shared/domain';

describe('Cancel reservation - Use Case', () => {
  let repository: ReservationRepositoryPort;
  let create: CreateReservationUseCase;
  let cancel: CancelReservationUseCase;
  let reservationCreated: ReservationResponse;

  beforeEach(async () => {
    repository = new ReservationRepositoryInMemoryAdapter();
    create = new CreateReservationUseCase(repository);
    cancel = new CancelReservationUseCase(repository);

    const checkInDate = new Date(Date.now() + 9999999);
    const checkOutDate = new Date(checkInDate.getTime() + 9999999);

    reservationCreated = await create.execute({
      hotelId: 'hotel-id',
      userId: 'user-id',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
  });

  it('should cancel a reservation', async () => {
    await cancel.execute({ reservationId: reservationCreated.reservationId });

    const result = await repository.getOneByReservationId(
      new ReservationId(reservationCreated.reservationId),
    );

    expect(result).toBeTruthy();
    expect(result?.status.value).toBe('CANCELLED');
  });

  it('should throw an error when reservation not found', async () => {
    await expect(cancel.execute({ reservationId: 'xxxxx' })).rejects.toThrow(
      HttpError,
    );
  });

  it('should throw an error when reservation not found', async () => {
    await repository.confirm(
      new ReservationId(reservationCreated.reservationId),
      new ReservationPaymentId('payment-id'),
    );

    await expect(
      cancel.execute({ reservationId: reservationCreated.reservationId }),
    ).rejects.toThrow(HttpError);
  });
});
