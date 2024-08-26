import { integer, pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';
import { recipes } from './recipes';

export const recipePurchases = pgTable('RecipePurchase', {
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    recipeID: integer('recipeID')
        .notNull()
        .references(() => recipes.id)
});
