import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { recipes } from './recipes';
import { recipePacks } from './recipe-packs';

export const recipesToRecipePacks = pgTable(
    'RecipeToRecipePack',
    {
        recipeID: integer('recipeID')
            .notNull()
            .references(() => recipes.id, { onDelete: 'cascade' }),
        recipePackID: integer('recipePackID')
            .notNull()
            .references(() => recipePacks.id, { onDelete: 'cascade' })
    },
    (table) => ({
        pk: primaryKey({ columns: [table.recipeID, table.recipePackID] })
    })
);
