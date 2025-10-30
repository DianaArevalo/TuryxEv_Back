import { mongoose as mg } from "../../../../lib/Shared/Infraestructure/External";

export interface IHotelDocument extends mg.Document {
  name: string;
  email: string;
  password?: string;
  location?: string;
  picture?: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  idRole: 1 | 2;
  idPlan: 0 | 1 | 2;
  status: 0 | 1 | 2;
  providerData: 0 | 1 | 2;
  freePlanEnd: Date;
}

const HotelSchema = new mg.Schema<IHotelDocument>(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: false},
        location: { type: String, required: false},
        picture: { type: String, required: false},
        score: {type: Number, required: true},
        idRole: {type: Number, enum: [1,2], required: true},
        idPlan: {type: Number, enum: [0,1,2], required: true},
        status: {type: Number, enum: [0,1,2], required: true},
        providerData: {type: Number, enum: [0,1,2], required: true},
        freePlanEnd: {type: Date, required: false}
    },
    {
        timestamps: true,
    }
);

export default mg.model<IHotelDocument>("Hotel", HotelSchema);