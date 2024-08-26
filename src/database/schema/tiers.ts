import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users';

export const tiers = pgTable('Tier', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    level: integer('level').notNull(),
    price: integer('price').notNull(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id)
});
