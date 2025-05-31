import { defineConfig } from 'drizzle-kit';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'database.sqlite')
  : './database.sqlite';

export default defineConfig({
  schema: './app/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbPath,
  },
});