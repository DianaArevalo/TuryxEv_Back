import {
  CreateReservation,
  GetUserReservations,
} from '~/lib/Reservation/application';
import { ReservationRepository } from '~/lib/Reservation/domain';
import { InMemoryReservationRepository } from '~/lib/Reservation/infrastructure/repositories/in-memory-reservation-repository';

describe('Reservation/application/get-one-by-reservation-id', () => {
  let repository: ReservationRepository;
  let getUserReservations: GetUserReservations;
  let createReservation: CreateReservation;

  beforeEach(() => {
    repository = new InMemoryReservationRepository();
    getUserReservations = new GetUserReservations(repository);
    createReservation = new CreateReservation(repository);
  });

  it('should return reservations by userId', async () => {
    const today = new Date(Date.now());
    const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);
    const aDayAfterTomorrow = new Date(
      tomorrow.getTime() + 1000 * 60 * 60 * 24,
    );

    const reservations = [
      {
        userId: 'user-1',
        hotelId: 'hotel-1',
        checkInDate: tomorrow,
        checkOutDate: aDayAfterTomorrow,
      },
      {
        userId: 'user-2',
        hotelId: 'hotel-1',
        checkInDate: tomorrow,
        checkOutDate: aDayAfterTomorrow,
      },
      {
        userId: 'user-1',
        hotelId: 'hotel-2',
        checkInDate: tomorrow,
        checkOutDate: aDayAfterTomorrow,
      },
    ];

    await Promise.all(
      reservations.map((reservation) => createReservation.handler(reservation)),
    );

    const result = await getUserReservations.handler({ userId: 'user-1' });

    expect(result).toHaveLength(2);
  });
});
