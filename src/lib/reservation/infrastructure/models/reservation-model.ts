import { mongoose as mg } from '../../../Shared/Infraestructure/External';

export interface IReservationDocument extends mg.Document {
  userId: string;
  hotelId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: 0 | 1 | 2;
  totalAmount: number;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new mg.Schema<IReservationDocument>(
  {
    userId: { type: String, required: true },
    hotelId: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: { type: Number, enum: [0, 1, 2], required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: false, default: null, unique: false },
  },
  {
    timestamps: true,
  },
);

export default mg.model<IReservationDocument>('Reservation', ReservationSchema);
