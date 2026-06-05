import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const {{ prefix_name }}s = mysqlTable('{{ prefix_name }}s', {
  id: varchar('id', { length: 36 }).primaryKey(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
});
