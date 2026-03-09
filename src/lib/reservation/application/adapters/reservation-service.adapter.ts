import { ReservationResponse, ReservationServicePort } from '../../domain';
import {
  GetReservationByIdUseCase,
  GetReservationsByHotelIdUseCase,
  GetUserReservationsUseCase,
} from '../use-cases';

export interface ReservationServiceUseCases {
  getReservationsByHotelId: GetReservationsByHotelIdUseCase;
  getUserReservations: GetUserReservationsUseCase;
  getReservationById: GetReservationByIdUseCase;
}

export class ReservationServiceAdapter implements ReservationServicePort {
  constructor(private readonly props: ReservationServiceUseCases) {}

  getReservationsByHotelId(hotelId: string): Promise<ReservationResponse[]> {
    return this.props.getReservationsByHotelId.execute({ hotelId });
  }

  getUserReservations(userId: string): Promise<ReservationResponse[]> {
    return this.props.getUserReservations.execute({ userId });
  }

  getReservationById(reservationId: string): Promise<ReservationResponse> {
    return this.props.getReservationById.execute({ reservationId });
  }
}
