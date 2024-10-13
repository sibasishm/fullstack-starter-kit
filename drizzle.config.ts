import env from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "server/db/schemas/*",
  out: "drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  }
})