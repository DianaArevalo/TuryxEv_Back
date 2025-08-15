import { Schema, model, Document } from 'mongoose';

export interface IUserDocument extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN';
}

const UserSchema = new Schema<IUserDocument>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true },
    role: { 
    type: String, 
    enum: ['CLIENT', 'HOTEL', 'BUSINESS', 'ADMIN'],
    required: true
    }
});

export default model<IUserDocument>('User', UserSchema);
