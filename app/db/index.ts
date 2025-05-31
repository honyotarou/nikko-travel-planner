import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

// Use Turso in production if available, otherwise local SQLite
if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
  // Dynamic import for Turso (production)
  const { tursoDb } = await import('./turso');
  export const db = tursoDb;
} else {
  // Local SQLite for development
  const sqlite = new Database('./database.sqlite');
  export const db = drizzle(sqlite, { schema });
}