import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Local SQLite for development (Turso support can be added later)
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'database.sqlite')
  : './database.sqlite';

console.log(`Database path: ${dbPath}`);

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });