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
  "<rootDir>/src/.*/infrastructure/adapters/.*",
  "<rootDir>/src/.*/infrastructure/composition/.*",
  "<rootDir>/src/.*/infrastructure/controller/.*",
  "<rootDir>/src/.*/infrastructure/models/.*",
  "<rootDir>/src/.*/infrastructure/routes/.*",
  "<rootDir>/src/.*/infrastructure/repositories/(?!in-memory/).*",
],

 coveragePathIgnorePatterns: [
  "/node_modules/",
  // Ignorar Shared temporalmente
  "<rootDir>/src/lib/Shared/",
  "<rootDir>/src/lib/shared/",
  "<rootDir>/src/lib/JWT/domain/ports/.*",           // puertos
  "<rootDir>/src/lib/JWT/application/adapters/.*",   // adaptadores
  "<rootDir>/src/lib/JWT/infraestructure/repositories/(?!in-memory/).*", // repositorios reales
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
