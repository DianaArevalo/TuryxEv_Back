import { mongoose as mg } from '../../../Shared/Infraestructure/External';

export interface IBusinessDocument extends mg.Document {
  name: string;
  email: string;
  password?: string;
  location?: string;
  picture?: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  idRole: 0 | 1;
  idPlan: 0 | 1 | 2;
  status: 0 | 1 | 2;
  providerData: 0 | 1 | 2;
}

const BusinessSchema = new mg.Schema<IBusinessDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    location: { type: String, required: false },
    picture: { type: String, required: false },
    score: { type: Number, required: true },
    idRole: { type: Number, enum: [0, 1], required: true },
    idPlan: { type: Number, enum: [0, 1, 2], required: true },
    status: { type: Number, enum: [0, 1, 2], required: true },
    providerData: { type: Number, enum: [0, 1, 2], required: true },
  },
  {
    timestamps: true,
  },
);

export default mg.model<IBusinessDocument>('Business', BusinessSchema);
