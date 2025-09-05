import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config(); // <-- ensure env variables are loaded

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  //  schema: "./auth-schema.ts",   -> for root
  out: "./drizzle",
  dialect: "postgresql", // use dialect for PostgreSQL
  dbCredentials: {
    url: process.env.DATABASE_URL!, // <-- this is required
  },
});
