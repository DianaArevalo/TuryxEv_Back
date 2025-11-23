import {
  ReservationResponse,
  ReservationServicePort,
} from '~/lib/reservation/domain';
import { HttpError } from '~/lib/shared/domain';
import {
  FilterReservationsProps,
  SuperAdminReservationServicePort,
} from '~/lib/superadmin/domain';

export class SuperAdminReservationServiceAdapter
  implements SuperAdminReservationServicePort
{
  constructor(private readonly reservationService: ReservationServicePort) {}
  filterReservations(
    props: FilterReservationsProps,
  ): Promise<ReservationResponse[]> {
    if ((!props.hotelId && !props.userId) || (props.hotelId && props.userId))
      throw new HttpError('Either hotelId or userId must be provided.', 400);

    if (props.hotelId)
      return this.reservationService.getReservationsByHotelId(props.hotelId);
    if (props.userId)
      return this.reservationService.getUserReservations(props.userId);

    throw new HttpError('Either hotelId or userId must be provided.', 400);
  }

  getReservationById(reservationId: string): Promise<ReservationResponse> {
    return this.reservationService.getReservationById(reservationId);
  }
}
