// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node", // important: use Node for Supertest (not jsdom)
  roots: ["<rootDir>/api/tests"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
