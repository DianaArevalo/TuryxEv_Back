import {
  Reservation,
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationRepository,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
} from "../../domain";

interface CreateReservationHandlerProps {
  userId: string;
  hotelId: string;
  checkInDate: Date;
  checkOutDate: Date;
}

export class CreateReservation {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: CreateReservationHandlerProps): Promise<void> {
    const now = new Date(Date.now());

    const reservation = new Reservation({
      reservationId: new ReservationId(""),
      userId: new ReservationUserId(props.userId),
      hotelId: new ReservationHotelId(props.hotelId),
      checkInDate: ReservationCheckInDate.create(props.checkInDate),
      checkOutDate: ReservationCheckOutDate.create(
        props.checkOutDate,
        props.checkInDate
      ),
      status: ReservationStatus.create(),
      totalAmount: ReservationTotalAmount.create(0),
      createdAt: ReservationCreatedAt.create(now),
      updatedAt: ReservationUpdatedAt.now(ReservationCreatedAt.create(now)),
    });

    return this.repository.create(reservation);
  }
}
