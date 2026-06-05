import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/persistence/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'mysql://user:pass@localhost/{{ project-name }}',
  },
});
