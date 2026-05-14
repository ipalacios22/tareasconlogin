import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Usamos 'url' directamente. Drizzle-kit buscará DATABASE_URL en tu .env automáticamente
    url: process.env.DATABASE_URL!,
  },
});