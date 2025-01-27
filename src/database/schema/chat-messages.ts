import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { chats } from '@db/chats';
import { users } from '@db/users';

export const chatMessages = pgTable('chat_messages', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  role: text('role').notNull(),
  parts: text('parts').array().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  chatID: integer('chat_id')
    .notNull()
    .references(() => chats.id, { onDelete: 'cascade' }),
  userID: integer('user_id')
    .notNull()
    .references(() => users.id)
});
