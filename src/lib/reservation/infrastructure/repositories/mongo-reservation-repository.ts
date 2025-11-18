import {
  Reservation,
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationNotFoundError,
  ReservationPaymentId,
  ReservationRepository,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
} from '../../domain';
import ReservationModel, {
  IReservationDocument,
} from '../models/reservation-model';

export class MongoReservationRepository implements ReservationRepository {
  async getOneByReservationId(
    reservationid: ReservationId,
  ): Promise<Reservation | null> {
    const record = await ReservationModel.findById(reservationid.value).exec();

    if (!record) return null;

    return this.createReservationEntity(record);
  }

  async getAllUserReservations(
    userId: ReservationUserId,
  ): Promise<Reservation[]> {
    const records = await ReservationModel.find({
      userId: userId.value,
    }).exec();

    return records.map((record) => this.createReservationEntity(record));
  }

  async getAllByHotelId(hotelId: ReservationHotelId): Promise<Reservation[]> {
    const records = await ReservationModel.find({
      hotelId: hotelId.value,
    }).exec();

    return records.map((record) => this.createReservationEntity(record));
  }

  async create(reservation: Reservation): Promise<Reservation> {
    const created = await ReservationModel.create({
      userId: reservation.userId.value,
      hotelId: reservation.hotelId.value,
      checkInDate: reservation.checkInDate.value,
      checkOutDate: reservation.checkOutDate.value,
      status: reservation.status.toPrimitives(),
      totalAmount: reservation.totalAmount.value,
      paymentId: reservation.paymentId
        ? reservation.paymentId.value
        : undefined,
    });

    return this.createReservationEntity(created);
  }

  async edit(reservation: Reservation): Promise<Reservation> {
    const record = await ReservationModel.findById(
      reservation.reservationId.value,
    ).exec();

    if (!record) throw new ReservationNotFoundError();

    record.checkInDate = reservation.checkInDate.value;
    record.checkOutDate = reservation.checkOutDate.value;
    record.status = reservation.status.toPrimitives();

    await record.save();

    return this.createReservationEntity(record);
  }

  async confirm(
    reservationId: ReservationId,
    paymentId: ReservationPaymentId,
  ): Promise<void> {
    const record = await ReservationModel.findById(reservationId.value).exec();

    if (!record) throw new ReservationNotFoundError();

    record.status = new ReservationStatus('CONFIRMED').toPrimitives();
    record.paymentId = paymentId.value;

    await record.save();
  }

  async cancel(reservationId: ReservationId): Promise<void> {
    const record = await ReservationModel.findById(reservationId.value).exec();

    if (!record) throw new ReservationNotFoundError();

    record.status = new ReservationStatus('CANCELLED').toPrimitives();

    await record.save();
  }

  private createReservationEntity(record: IReservationDocument) {
    return new Reservation({
      reservationId: new ReservationId(String(record._id)),
      userId: new ReservationUserId(record.userId),
      hotelId: new ReservationHotelId(record.hotelId),
      checkInDate: new ReservationCheckInDate(record.checkInDate),
      checkOutDate: new ReservationCheckOutDate(record.checkOutDate),
      status: ReservationStatus.fromPrimitives(record.status),
      totalAmount: new ReservationTotalAmount(record.totalAmount),
      paymentId: record.paymentId
        ? new ReservationPaymentId(record.paymentId)
        : undefined,
      createdAt: new ReservationCreatedAt(record.createdAt),
      updatedAt: new ReservationUpdatedAt(record.updatedAt),
    });
  }
}
