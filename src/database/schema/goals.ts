import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const goals = pgTable('Goal', {
    id: serial('id').primaryKey(),
    type: text('type').notNull(),
    value: integer('value').notNull(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    startedAt: timestamp('until').notNull(),
    endsAt: timestamp('until').notNull()
});
