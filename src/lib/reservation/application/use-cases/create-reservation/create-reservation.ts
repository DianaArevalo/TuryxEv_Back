import {
  Reservation,
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationRepositoryPort,
  ReservationResponse,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
} from '~/lib/reservation/domain';
import { UseCase } from '~/lib/Shared/application/usecase';

export interface CreateReservationDTO {
  userId: string;
  hotelId: string;
  checkInDate: Date;
  checkOutDate: Date;
}

export class CreateReservationUseCase
  implements UseCase<CreateReservationDTO, ReservationResponse>
{
  constructor(private readonly repository: ReservationRepositoryPort) {}

  async execute(props: CreateReservationDTO): Promise<ReservationResponse> {
    const now = new Date(Date.now());
    const createdAt = ReservationCreatedAt.create(now);

    const reservation = new Reservation({
      reservationId: new ReservationId(''),
      userId: new ReservationUserId(props.userId),
      hotelId: new ReservationHotelId(props.hotelId),
      checkInDate: ReservationCheckInDate.create(props.checkInDate),
      checkOutDate: ReservationCheckOutDate.create(
        props.checkOutDate,
        props.checkInDate,
      ),
      status: ReservationStatus.create(),
      totalAmount: ReservationTotalAmount.create(0),
      createdAt: createdAt,
      updatedAt: ReservationUpdatedAt.now(createdAt),
    });

    const created = await this.repository.create(reservation);

    return created.toResponse();
  }
}
