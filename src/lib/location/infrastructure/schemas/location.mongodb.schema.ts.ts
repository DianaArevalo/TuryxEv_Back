import { mongoose as mg } from "../../../Shared/Infraestructure/External";

export interface ILocationDocument extends mg.Document {
  city: mg.Types.ObjectId;
  address: string;
  lat: number;
  lng: number;
  hotelId?: string;
  businessId?: string;
}

const Location = new mg.Schema<ILocationDocument>(
  {
    city: { type: mg.Schema.Types.ObjectId, required: true, ref: "City" },
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    hotelId: { type: mg.Schema.Types.ObjectId, required: false, ref: "Hotel" },
    businessId: {
      type: mg.Schema.Types.ObjectId,
      required: false,
      ref: "Business",
    },
  },
  {
    timestamps: true,
  }
);

export const LocationSchema = mg.model<ILocationDocument>("Location", Location);
