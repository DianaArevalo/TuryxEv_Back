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
        email: {type: String, required: true},
        password: {type: String, required: false},
        picture: {type: String, required: false},
        plan: {type: Number, enum: [ 0, 1, 2], required: true},
        role: {type: Number, enum: [0], required: true},
        score: {type: Boolean, required: false},
        providerData: {type: Number, enum: [0,1,2], required: true},
        status: {type: Boolean, required: true}
    },
{
 timestamps: true 
}
);

export default mg.model<IUserDocument>('User', UserSchema);
