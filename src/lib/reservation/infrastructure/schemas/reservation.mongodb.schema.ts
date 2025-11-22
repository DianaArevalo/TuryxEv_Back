import {
  ReservationStatusPrimitiveArray,
  ReservationStatusPrimitiveT,
} from '../../domain';

import { mongoose as mg } from '~/lib/shared/infrastructure';

export interface IReservationDocument extends mg.Document {
  userId: string;
  hotelId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatusPrimitiveT;
  totalAmount: number;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const Reservation = new mg.Schema<IReservationDocument>(
  {
    userId: { type: String, required: true },
    hotelId: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: {
      type: Number,
      enum: ReservationStatusPrimitiveArray,
      required: true,
    },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: false, default: null, unique: false },
  },
  {
    timestamps: true,
  },
);

export const ReservationSchema = mg.model<IReservationDocument>(
  'Reservation',
  Reservation,
);
