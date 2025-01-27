import { integer, jsonb, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@db/users';

export const dietaryLogs = pgTable('dietary_logs', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  calories: integer('calories').notNull(),
  details: jsonb('details').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userID: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
});
