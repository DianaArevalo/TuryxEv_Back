import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/**/infrastructure/adapters/",
    "<rootDir>/src/**/infrastructure/composition/",
    "<rootDir>/src/**/infrastructure/controller/",
    "<rootDir>/src/**/infrastructure/models/",
    "<rootDir>/src/**/infrastructure/routes/",
    "<rootDir>/src/**/infrastructure/repositories/(?!in-memory)", 
    //
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

export default config;
