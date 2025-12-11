// src/config/config_test.ts
export const testConfig = {
  mongoUri: process.env.MONGO_URI,
  testDbName: process.env.TEST_DB_NAME || "hotel",
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || "test-secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "test-refresh-secret",
};



//mongodb+srv://<db_username>:<db_password>@cluster0.9bfilql.mongodb.net/?appName=Cluster0