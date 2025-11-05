import {mongoose as mg} from "../../../Shared/Infraestructure/External";

export interface IUserDocument extends mg.Document {
    name: string;
    email: string;
    password?: string;
    picture?: string;
    plan: 0 | 1 | 2;
    role: 0;
    score?: number;
    providerData: 0 | 1 | 2;
    status?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mg.Schema<IUserDocument>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: false},
        picture: {type: String, required: false},
        plan: {type: Number, enum: [ 0, 1, 2], default: 0},
        role: {type: Number, enum: [0], default: 0},
        score: {type: Number, default: 5},
        providerData: {type: Number, enum: [0,1,2], default: 0},
        status: {type: Boolean, default: true}
    },
{
 timestamps: true 
}
);

export default mg.model<IUserDocument>('User', UserSchema);
