import {mongoose as mg} from "../../../Shared/Infraestructure/External";

export interface IUserDocument extends mg.Document {
    name: string;
    email: string;
    password?: string;
    picture?: string;
    plan: 0 | 1 | 2;
    role: 0;
    score?: number;
    providerData: string;
    status?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mg.Schema<IUserDocument>(
    {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true },
    role: { 
    type: String, 
    enum: ['CLIENT', 'HOTEL', 'BUSINESS', 'ADMIN'],
    required: true
    },
    status: {type: Boolean, default: true}

},
{
 timestamps: true 
}
);

export default mg.model<IUserDocument>('User', UserSchema);
