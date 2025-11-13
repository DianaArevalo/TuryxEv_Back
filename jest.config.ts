import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },

  testPathIgnorePatterns: [
    "/node_modules/",

    // Ignorar varias partes de infraestructura
    // PERO permitir repositorios
    "<rootDir>/src/.*/infrastructure/composition/.*",
    "<rootDir>/src/.*/infrastructure/controller/.*",
    "<rootDir>/src/.*/infrastructure/models/.*",
    "<rootDir>/src/.*/infrastructure/routes/.*",

    // IMPORTANTE:
    // NO ignoramos infrastructure/adapters/
    // NO ignoramos infrastructure/repositories/
  ],

  coveragePathIgnorePatterns: [
    "/node_modules/",

    "<rootDir>/src/lib/Shared/",
    "<rootDir>/src/lib/shared/",

    "<rootDir>/src/lib/JWT/domain/ports/.*",
    "<rootDir>/src/lib/JWT/application/adapters/.*",
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
