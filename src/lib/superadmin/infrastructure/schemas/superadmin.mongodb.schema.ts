import { mongoose as mg } from '~/lib/shared/infrastructure';

export interface ISuperAdminDocument extends mg.Document {
  name: string;
  email: string;
  password: string;
  canCreateSuperUser: boolean;
  canEditUsers: boolean;
  canViewReservations: boolean;
  canBlockAccounts: boolean;
  canEditHotels: boolean;
  canEditBusiness: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

const SuperAdmin = new mg.Schema<ISuperAdminDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    canCreateSuperUser: { type: Boolean, required: true },
    canEditUsers: { type: Boolean, required: true },
    canViewReservations: { type: Boolean, required: true },
    canBlockAccounts: { type: Boolean, required: false },
    canEditHotels: { type: Boolean, required: true },
    canEditBusiness: { type: Boolean, required: true },
    isActive: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    lastLogin: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);

export const SuperAdminSchema = mg.model<ISuperAdminDocument>(
  'SuperAdmin',
  SuperAdmin,
);
