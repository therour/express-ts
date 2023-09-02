/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/tests/setups/setup-env.ts"],
  setupFilesAfterEnv: [],
  restoreMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov", "clover"],
  coveragePathIgnorePatterns: ["<rootDir>/src/env.ts", "<rootDir>/src/index.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
}

export default config
