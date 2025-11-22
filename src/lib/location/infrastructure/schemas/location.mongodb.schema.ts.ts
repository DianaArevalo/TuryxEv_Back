import { mongoose as mg } from '~/lib/shared/infrastructure';

export interface ILocationDocument extends mg.Document {
  city: mg.Types.ObjectId;
  address: string;
  hotelId?: string;
  businessId?: string;
}

const Location = new mg.Schema<ILocationDocument>(
  {
    city: { type: mg.Schema.Types.ObjectId, required: true, ref: 'City' },
    address: { type: String, required: true },
    hotelId: { type: mg.Schema.Types.ObjectId, required: false, ref: 'Hotel' },
    businessId: {
      type: mg.Schema.Types.ObjectId,
      required: false,
      ref: 'Business',
    },
  },
  {
    timestamps: true,
  },
);

export const LocationSchema = mg.model<ILocationDocument>('Location', Location);
