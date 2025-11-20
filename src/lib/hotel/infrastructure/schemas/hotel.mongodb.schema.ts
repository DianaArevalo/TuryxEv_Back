import {
  HotelPrimitiveArray,
  HotelPrimitiveT,
  HotelRolePrimitiveArray,
  HotelRolePrimitiveT,
  HotelStatusPrimitiveArray,
  HotelStatusPrimitiveT,
} from '../../domain';

import { mongoose as mg } from '~/lib/Shared/Infraestructure/External';

export interface IHotelDocument extends mg.Document {
  name: string;
  email: string;
  password?: string;
  location?: mg.Types.ObjectId;
  picture?: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  role: HotelRolePrimitiveT;
  plan: HotelPrimitiveT;
  status: HotelStatusPrimitiveT;
  providerData: HotelPrimitiveT;
  freePlanEnd: Date;
}

const Hotel = new mg.Schema<IHotelDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    location: {
      type: mg.Schema.Types.ObjectId,
      required: false,
      ref: 'Location',
    },
    picture: { type: String, required: false },
    score: { type: Number, required: true },
    role: { type: Number, enum: HotelRolePrimitiveArray, required: true },
    plan: { type: Number, enum: HotelPrimitiveArray, required: true },
    status: { type: Number, enum: HotelStatusPrimitiveArray, required: true },
    providerData: { type: Number, enum: HotelPrimitiveArray, required: true },
    freePlanEnd: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);

export const HotelSchema = mg.model<IHotelDocument>('Hotel', Hotel);
