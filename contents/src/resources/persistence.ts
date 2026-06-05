import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { settings } from '../settings';

let _pool: mysql.Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export async function initResource(): Promise<void> {
  _pool = mysql.createPool(settings.databaseUrl);
  _db = drizzle(_pool);
}

export async function closeResource(): Promise<void> {
  if (_pool) {
    await _pool.end();
    _pool = null;
    _db = null;
  }
}

export function getDb(): ReturnType<typeof drizzle> {
  if (!_db) throw new Error('Database not initialized');
  return _db;
}
