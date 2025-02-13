import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@db/users';

export const chats = pgTable('chats', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userID: integer('user_id')
    .notNull()
    .references(() => users.id)
});
