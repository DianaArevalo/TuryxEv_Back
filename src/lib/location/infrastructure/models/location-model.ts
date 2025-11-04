import { mongoose as mg } from "../../../Shared/Infraestructure/External";

export interface ILocationDocument extends mg.Document {
  city: mg.ObjectId;
  address: string;
  hotelId?: string;
  businessId?: string;
}

const LocationSchema = new mg.Schema<ILocationDocument>(
  {
    city: { type: mg.Types.ObjectId, required: true },
    address: { type: String, required: true },
    hotelId: { type: mg.Types.ObjectId, required: false },
    businessId: { type: mg.Types.ObjectId, required: false },
  },
  {
    timestamps: true,
  }
);

export default mg.model<ILocationDocument>("Location", LocationSchema);
