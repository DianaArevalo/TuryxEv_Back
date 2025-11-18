import {
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationPaymentId,
  ReservationStatus,
  ReservationStatusT,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
} from './value-objects';

export interface ReservationI {
  reservationId: ReservationId;
  userId: ReservationUserId;
  hotelId: ReservationHotelId;
  checkInDate: ReservationCheckInDate;
  checkOutDate: ReservationCheckOutDate;
  status: ReservationStatus;
  totalAmount: ReservationTotalAmount;
  paymentId?: ReservationPaymentId;
  createdAt: ReservationCreatedAt;
  updatedAt: ReservationUpdatedAt;
}

export interface ReservationResponse {
  reservationId: string;
  userId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatusT;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Reservation implements ReservationI {
  reservationId: ReservationId;
  userId: ReservationUserId;
  hotelId: ReservationHotelId;
  checkInDate: ReservationCheckInDate;
  checkOutDate: ReservationCheckOutDate;
  status: ReservationStatus;
  totalAmount: ReservationTotalAmount;
  paymentId?: ReservationPaymentId;
  createdAt: ReservationCreatedAt;
  updatedAt: ReservationUpdatedAt;

  constructor(attr: ReservationI) {
    this.reservationId = attr.reservationId;
    this.userId = attr.userId;
    this.hotelId = attr.hotelId;
    this.checkInDate = attr.checkInDate;
    this.checkOutDate = attr.checkOutDate;
    this.status = attr.status;
    this.totalAmount = attr.totalAmount;
    this.paymentId = attr.paymentId;
    this.createdAt = attr.createdAt;
    this.updatedAt = attr.updatedAt;
  }

  toResponse(): ReservationResponse {
    return {
      reservationId: this.reservationId.value,
      userId: this.userId.value,
      checkInDate: this.checkInDate.value,
      checkOutDate: this.checkOutDate.value,
      status: this.status.value,
      totalAmount: this.totalAmount.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
