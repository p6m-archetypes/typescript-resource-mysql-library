import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { settings } from '../settings';

declare module 'fastify' {
  interface FastifyInstance {
    db: ReturnType<typeof drizzle>;
  }
}

const persistencePlugin: FastifyPluginAsync = async (fastify) => {
  const pool = mysql.createPool({
    host: settings.dbHost,
    port: settings.dbPort,
    user: settings.dbUsername,
    password: settings.dbPassword,
    database: settings.dbName,
  });
  const db = drizzle(pool);
  fastify.decorate('db', db);
  fastify.addHook('onClose', async () => {
    await pool.end();
  });
};

export default fp(persistencePlugin, { name: 'persistence' });
