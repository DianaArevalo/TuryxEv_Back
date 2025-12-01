import { mongoose as mg } from "../../../Shared/Infraestructure/External";

export interface ICityDocument extends mg.Document {
  name: string;
  department: string;
  country: string;
}

const CitySchema = new mg.Schema<ICityDocument>(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mg.model<ICityDocument>("City", CitySchema);
