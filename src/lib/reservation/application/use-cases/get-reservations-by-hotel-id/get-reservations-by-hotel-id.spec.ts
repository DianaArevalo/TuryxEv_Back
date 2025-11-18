import { ReservationRepositoryPort } from '~/lib/reservation/domain';
import { CreateReservationUseCase } from '../create-reservation/create-reservation';
import { GetReservationsByHotelIdUseCase } from './get-reservations-by-hotel-id';
import { ReservationRepositoryInMemoryAdapter } from '~/lib/reservation/infrastructure/adapters';

describe('Get reservations by hotel id - Use Case', () => {
  let repository: ReservationRepositoryPort;
  let create: CreateReservationUseCase;
  let getReservationsByHotelId: GetReservationsByHotelIdUseCase;

  beforeEach(async () => {
    repository = new ReservationRepositoryInMemoryAdapter();
    create = new CreateReservationUseCase(repository);
    getReservationsByHotelId = new GetReservationsByHotelIdUseCase(repository);

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

  it('should get reservations by hotelId', async () => {
    const result = await getReservationsByHotelId.execute({
      hotelId: 'hotel-id',
    });

    expect(result).toHaveLength(2);
  });
});
