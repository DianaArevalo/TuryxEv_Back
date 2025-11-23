import {
  UserPlanPrimitiveArray,
  UserPlanPrimitiveT,
  UserProviderDataPrimitiveArray,
  UserProviderDataPrimitiveT,
  UserRolePrimitiveArray,
  UserRolePrimitiveT,
} from '../../domain/entities';

import { mongoose as mg } from '~/lib/shared/infrastructure';

export interface IUserDocument extends mg.Document {
  name: string;
  email: string;
  password?: string;
  picture?: string;
  plan: UserPlanPrimitiveT;
  role: UserRolePrimitiveT;
  score?: number;
  providerData: UserProviderDataPrimitiveT;
  status?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const User = new mg.Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    picture: { type: String, required: false },
    plan: { type: Number, enum: UserPlanPrimitiveArray, default: 0 },
    role: { type: Number, enum: UserRolePrimitiveArray, default: 0 },
    score: { type: Number, default: 5 },
    providerData: {
      type: Number,
      enum: UserProviderDataPrimitiveArray,
      default: 0,
    },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const UserSchema = mg.model<IUserDocument>('User', User);
