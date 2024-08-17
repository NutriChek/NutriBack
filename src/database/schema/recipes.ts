import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users';

export const recipes = pgTable('Recipe', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id)
});
