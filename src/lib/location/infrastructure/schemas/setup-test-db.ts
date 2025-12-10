import mongoose from "mongoose";
import { testConfig } from "../../../../config/config_test";


export const connectTestDB = async () => {
  if (!testConfig.mongoUri) {
    throw new Error("Test Mongo URI not provided");
  }

  await mongoose.connect(testConfig.mongoUri, {
    dbName: testConfig.testDbName, // tu BD real de pruebas
  });
};

export const disconnectTestDB = async () => {
 // await mongoose.connection.dropDatabase(); // limpia la BD después de los tests
  await mongoose.connection.close();
};
