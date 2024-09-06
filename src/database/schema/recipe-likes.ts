import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { recipes } from './recipes';

export const recipeLikes = pgTable(
    'RecipeLike',
    {
        recipeID: integer('recipeID')
            .notNull()
            .references(() => recipes.id, {
                onDelete: 'cascade'
            }),
        userID: integer('userID')
            .notNull()
            .references(() => users.id)
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.recipeID, table.userID]
        })
    })
);
