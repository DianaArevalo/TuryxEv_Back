import {
  BusinessPlanPrimitiveArray,
  BusinessPlanPrimitiveT,
  BusinessRolePrimitiveArray,
  BusinessRolePrimitiveT,
  BusinessStatusPrimitiveArray,
  BusinessStatusPrimitiveT,
} from '../../domain';

import {
  ProviderDataPrimitiveArray,
  ProviderDataPrimitiveT,
} from '~/lib/shared/domain';
import { mongoose as mg } from '~/lib/shared/infrastructure';

export interface IBusinessDocument extends mg.Document {
  name: string;
  email: string;
  password?: string;
  location?: mg.Types.ObjectId;
  picture?: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  role: BusinessRolePrimitiveT;
  plan: BusinessPlanPrimitiveT;
  status: BusinessStatusPrimitiveT;
  providerData: ProviderDataPrimitiveT;
}

const Business = new mg.Schema<IBusinessDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    location: {
      type: mg.Schema.Types.ObjectId,
      required: false,
      ref: 'Location',
    },
    picture: { type: String, required: false },
    score: { type: Number, required: true },
    role: { type: Number, enum: BusinessRolePrimitiveArray, required: true },
    plan: { type: Number, enum: BusinessPlanPrimitiveArray, required: true },
    status: {
      type: Number,
      enum: BusinessStatusPrimitiveArray,
      required: true,
    },
    providerData: {
      type: Number,
      enum: ProviderDataPrimitiveArray,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BusinessSchema = mg.model<IBusinessDocument>('Business', Business);
