import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const mongoUri = process.env.MONGO_URI;
const testDbName = process.env.TEST_DB_NAME;

export const connectTestDB = async () => {
  if (!mongoUri) {
    throw new Error("Test Mongo URI not provided");
  }

  await mongoose.connect(mongoUri, {
    dbName: testDbName,
  });
};

export const disconnectTestDB = async () => {
  // await mongoose.connection.dropDatabase(); // opcional, limpia la BD
  await mongoose.connection.close();
};
