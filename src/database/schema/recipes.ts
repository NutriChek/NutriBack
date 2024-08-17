import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const recipes = pgTable('Recipe', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    likes: integer('likes').notNull().default(0),
    dislikes: integer('dislikes').notNull().default(0),
    createdAt: timestamp('createdAt', { withTimezone: true })
        .notNull()
        .defaultNow(),
    steps: text('steps').array().notNull(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id)
});
