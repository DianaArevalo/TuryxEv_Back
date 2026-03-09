import { ReservationRepositoryPort } from '~/lib/reservation/domain';
import { CreateReservationUseCase } from '../create-reservation/create-reservation';
import { GetUserReservationsUseCase } from './get-user-reservations';
import { ReservationRepositoryInMemoryAdapter } from '~/lib/reservation/infrastructure/adapters';

describe('Get user reservations - Use Case', () => {
  let repository: ReservationRepositoryPort;
  let create: CreateReservationUseCase;
  let getuserReservations: GetUserReservationsUseCase;

  beforeEach(async () => {
    repository = new ReservationRepositoryInMemoryAdapter();
    create = new CreateReservationUseCase(repository);
    getuserReservations = new GetUserReservationsUseCase(repository);

    const checkInDate = new Date(Date.now() + 9999999);
    const checkOutDate = new Date(checkInDate.getTime() + 9999999);

    await create.execute({
      hotelId: 'hotel-id',
      userId: 'user-id',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });

    await create.execute({
      hotelId: 'hotel-id',
      userId: 'user-id2',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });

    await create.execute({
      hotelId: 'hotel-id2',
      userId: 'user-id2',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
  });

  it('should get user reservations', async () => {
    const result = await getuserReservations.execute({ userId: 'user-id' });

    expect(result).toHaveLength(1);
  });
});
