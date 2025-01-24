import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { chats } from '@db/chats';

export const chatMessages = pgTable('chat_messages', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  chatID: integer('chat_id')
    .notNull()
    .references(() => chats.id, { onDelete: 'cascade' })
});
