import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { recipes } from './recipes';
import { tiers } from './tiers';

export const posts = pgTable('Post', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    likes: integer('likes').notNull().default(0),
    dislikes: integer('dislikes').notNull().default(0),
    createdAt: timestamp('createdAt', { withTimezone: true })
        .notNull()
        .defaultNow(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    recipeID: integer('recipeID').references(() => recipes.id),
    tierID: integer('tierID').references(() => tiers.id, {
        onDelete: 'set null'
    })
});
