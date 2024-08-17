import { boolean, integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { recipes } from './recipes';

export const recipeLikes = pgTable(
    'RecipeLike',
    {
        recipeID: integer('recipeID')
            .notNull()
            .references(() => recipes.id),
        userID: integer('userID')
            .notNull()
            .references(() => users.id),
        like: boolean('like').notNull()
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.recipeID, table.userID]
        })
    })
);
