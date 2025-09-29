import {
  CreateReservation,
  GetAllByHotelId,
} from "~/lib/Reservation/application";
import { ReservationRepository } from "~/lib/Reservation/domain";
import { InMemoryReservationRepository } from "~/lib/Reservation/infrastructure/repositories/in-memory-reservation-repository";

describe("Reservation/application/get-all-by-hotel-id", () => {
  let repository: ReservationRepository;
  let getAllByHotelId: GetAllByHotelId;
  let createReservation: CreateReservation;

  beforeEach(() => {
    repository = new InMemoryReservationRepository();
    getAllByHotelId = new GetAllByHotelId(repository);
    createReservation = new CreateReservation(repository);
  });

  it("should return reservations for a given hotelId", async () => {
    const today = new Date(Date.now());
    const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);
    const aDayAfterTomorrow = new Date(
      tomorrow.getTime() + 1000 * 60 * 60 * 24
    );

    const reservations = [
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

    reservations.map((reservation) => createReservation.handler(reservation));

    const result = await getAllByHotelId.handler({ hotelId: "hotel-1" });

    expect(result).toHaveLength(2);
  });
});
