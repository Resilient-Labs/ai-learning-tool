// jest.setup.ts
import dotenv from "dotenv";
import { resolve } from "path";

// Load env vars from .env.local before tests
dotenv.config({ path: resolve(__dirname, ".env.local") });

jest.setTimeout(30000);
