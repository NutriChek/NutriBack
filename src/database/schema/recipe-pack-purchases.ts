import { integer, pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';
import { recipePacks } from './recipe-packs';

export const recipePackPurchases = pgTable('RecipePackPurchase', {
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    recipePackID: integer('recipePackID')
        .notNull()
        .references(() => recipePacks.id)
});
