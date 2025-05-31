import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

// Local SQLite for development (Turso support can be added later)
const sqlite = new Database('./database.sqlite');
export const db = drizzle(sqlite, { schema });