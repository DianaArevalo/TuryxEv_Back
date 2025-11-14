import mongoose, { Schema, Document } from "mongoose";

export interface IRefreshToken extends Document {
  userId: string;
  tokenId: string;
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
  revoked: boolean;
  replacedByToken?: string;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: String, required: true },
  tokenId: { type: String, required: true, unique: true },
  tokenHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
  replacedByToken: { type: String, default: null },
});

// TTL index for automatic cleanup
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshTokenModel = mongoose.model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema
);
