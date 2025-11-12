import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
  revoked: boolean;
}

const TokenSchema = new Schema<IToken>({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
});

export const TokenModel = mongoose.model<IToken>("Token", TokenSchema);
