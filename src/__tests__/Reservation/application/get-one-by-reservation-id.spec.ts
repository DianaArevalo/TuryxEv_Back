import {
  CreateReservation,
  GetOneByReservationId,
} from "~/lib/Reservation/application";
import {
  ReservationNotFoundError,
  ReservationRepository,
} from "~/lib/Reservation/domain";
import { InMemoryReservationRepository } from "~/lib/Reservation/infrastructure/repositories/in-memory-repository";

function getMockReservations() {
  const today = new Date(Date.now());
  const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);
  const aDayAfterTomorrow = new Date(tomorrow.getTime() + 1000 * 60 * 60 * 24);

  return [
    {
      userId: "user-1",
      hotelId: "hotel-1",
      checkInDate: tomorrow,
      checkOutDate: aDayAfterTomorrow,
    },
    {
      userId: "user-2",
      hotelId: "hotel-1",
      checkInDate: tomorrow,
      checkOutDate: aDayAfterTomorrow,
    },
    {
      userId: "user-1",
      hotelId: "hotel-2",
      checkInDate: tomorrow,
      checkOutDate: aDayAfterTomorrow,
    },
  ];
}

describe("Reservation/application/get-one-by-reservation-id", () => {
  let repository: ReservationRepository;
  let getOneByReservationId: GetOneByReservationId;
  let createReservation: CreateReservation;

  beforeEach(() => {
    repository = new InMemoryReservationRepository();
    getOneByReservationId = new GetOneByReservationId(repository);
    createReservation = new CreateReservation(repository);
  });

  it("should return one reservation by hotelId", async () => {
    const reservations = getMockReservations();

    reservations.map((reservation) => createReservation.handler(reservation));

    const result = await getOneByReservationId.handler({
      reservationId: "user-1*hotel-1",
    });

    expect(result).not.toBeNull();
  });

  it("should throw if reservation not found", async () => {
    const reservations = getMockReservations();

    reservations.map((reservation) => createReservation.handler(reservation));

    await expect(
      getOneByReservationId.handler({
        reservationId: "not-found",
      })
    ).rejects.toBeInstanceOf(ReservationNotFoundError);
  });
});
