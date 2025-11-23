import { ReservationResponse } from '~/lib/reservation/domain';

export interface FilterReservationsProps {
  hotelId?: string;
  userId?: string;
}

export interface SuperAdminReservationServicePort {
  filterReservations(
    props: FilterReservationsProps,
  ): Promise<ReservationResponse[]>;
  getReservationById(reservationId: string): Promise<ReservationResponse>;
}
