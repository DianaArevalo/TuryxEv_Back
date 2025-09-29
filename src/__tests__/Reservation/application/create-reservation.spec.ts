import { CreateReservation } from "~/lib/Reservation/application";
import {
  ReservationHotelId,
  ReservationRepository,
  ReservationUserId,
} from "~/lib/Reservation/domain";
import { InMemoryReservationRepository } from "~/lib/Reservation/infrastructure/repositories/in-memory-reservation-repository";

describe("Reservation/application/create-reservation", () => {
  let repository: ReservationRepository;
  let createReservation: CreateReservation;

  beforeEach(() => {
    repository = new InMemoryReservationRepository();
    createReservation = new CreateReservation(repository);
  });

  it("should create a reservation and persist it", async () => {
    const today = new Date(Date.now());
    const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);
    const aDayAfterTomorrow = new Date(
      tomorrow.getTime() + 1000 * 60 * 60 * 24
    );

    const props = {
      userId: "user-1",
      hotelId: "hotel-1",
      checkInDate: tomorrow,
      checkOutDate: aDayAfterTomorrow,
    };

    await createReservation.handler(props);

    const reservations = await repository.getAllUserReservations(
      new ReservationUserId(props.userId)
    );

    expect(reservations).toHaveLength(1);

    const [reservation] = reservations;

    expect(reservation.userId).toEqual(new ReservationUserId(props.userId));
    expect(reservation.hotelId).toEqual(new ReservationHotelId(props.hotelId));
    expect(reservation.checkInDate.value).toEqual(props.checkInDate);
    expect(reservation.checkOutDate.value).toEqual(props.checkOutDate);
    expect(reservation.status.value).toBe("PENDING");
    expect(reservation.totalAmount.value).toBe(0);
    expect(reservation.createdAt.value).toBeInstanceOf(Date);
    expect(reservation.updatedAt.value).toBeInstanceOf(Date);
  });
});
