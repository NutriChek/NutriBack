import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users';
import { tiers } from './tiers';

export const recipePacks = pgTable('RecipePack', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    private: boolean('private').notNull(),
    price: integer('price'),
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    tierID: integer('tierID').references(() => tiers.id, {
        onDelete: 'set null'
    })
});
