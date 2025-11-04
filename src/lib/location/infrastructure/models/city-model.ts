import { mongoose as mg } from "../../../Shared/Infraestructure/External";

export interface ICityDocument extends mg.Document {
  name: string;
}

const CitySchema = new mg.Schema<ICityDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mg.model<ICityDocument>("City", CitySchema);
