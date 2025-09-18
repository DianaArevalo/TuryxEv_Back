import {
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationPaymentId,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
} from "./value-objects";

export interface ReservationI {
  idReservation: ReservationId;
  userId: ReservationUserId;
  hotelId: ReservationHotelId;
  checkInDate: ReservationCheckInDate;
  checkOutDate: ReservationCheckOutDate;
  status: ReservationStatus;
  totalAmount: ReservationTotalAmount;
  paymentid: ReservationPaymentId;
  createdAt: ReservationCreatedAt;
  updatedAt: ReservationUpdatedAt;
}

export class Reservation implements ReservationI {
  idReservation: ReservationId;
  userId: ReservationUserId;
  hotelId: ReservationHotelId;
  checkInDate: ReservationCheckInDate;
  checkOutDate: ReservationCheckOutDate;
  status: ReservationStatus;
  totalAmount: ReservationTotalAmount;
  paymentid: ReservationPaymentId;
  createdAt: ReservationCreatedAt;
  updatedAt: ReservationUpdatedAt;

  constructor(attr: ReservationI) {
    this.idReservation = attr.idReservation;
    this.userId = attr.userId;
    this.hotelId = attr.hotelId;
    this.checkInDate = attr.checkInDate;
    this.checkOutDate = attr.checkOutDate;
    this.status = attr.status;
    this.totalAmount = attr.totalAmount;
    this.paymentid = attr.paymentid;
    this.createdAt = attr.createdAt;
    this.updatedAt = attr.updatedAt;
  }
}
