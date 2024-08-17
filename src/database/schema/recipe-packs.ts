import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users';

export const recipePacks = pgTable('RecipePack', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id)
});
