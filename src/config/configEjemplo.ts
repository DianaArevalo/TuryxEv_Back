export const config = {
  mongoUri: "MONGO_URI_HERE",
  port: 3000
};

export const testConfig = {
  mongoUri: process.env.MONGO_TEST_URI ?? "",
  testDbName: "nametest_db",
  port: 4000,
  jwtSecret: process.env.JWT_SECRET ?? "",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "",
};