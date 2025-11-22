import { mongoose as mg } from '~/lib/shared/infrastructure';

export interface ICityDocument extends mg.Document {
  name: string;
}

const City = new mg.Schema<ICityDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const CitySchema = mg.model<ICityDocument>('City', City);
