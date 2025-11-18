import {
  ReservationRepositoryPort,
  ReservationResponse,
} from '~/lib/reservation/domain';
import { CreateReservationUseCase } from '../create-reservation/create-reservation';
import { GetReservationByIdUseCase } from './get-reservation-by-id';
import { ReservationRepositoryInMemoryAdapter } from '~/lib/reservation/infrastructure/adapters';
import { HttpError } from '~/lib/Shared/domain';

describe('Get reservation by id - Use Case', () => {
  let repository: ReservationRepositoryPort;
  let create: CreateReservationUseCase;
  let getReservationById: GetReservationByIdUseCase;
  let reservationCreated: ReservationResponse;

  beforeEach(async () => {
    repository = new ReservationRepositoryInMemoryAdapter();
    create = new CreateReservationUseCase(repository);
    getReservationById = new GetReservationByIdUseCase(repository);

    const checkInDate = new Date(Date.now() + 9999999);
    const checkOutDate = new Date(checkInDate.getTime() + 9999999);

    reservationCreated = await create.execute({
      hotelId: 'hotel-id',
      userId: 'user-id',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
  });

  it('should get reservation by id', async () => {
    const result = await getReservationById.execute({
      reservationId: reservationCreated.reservationId,
    });

    expect(result).toBeTruthy();
  });

  it('should throw an error when reservation not found', async () => {
    await expect(
      getReservationById.execute({
        reservationId: 'xxxxx',
      }),
    ).rejects.toThrow(HttpError);
  });
});
