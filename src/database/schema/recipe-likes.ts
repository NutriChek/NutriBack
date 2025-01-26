import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from '@db/users';
import { recipes } from '@db/recipes';

export const recipeLikes = pgTable(
  'recipe_likes',
  {
    recipeID: integer('recipe_id')
      .notNull()
      .references(() => recipes.id, {
        onDelete: 'cascade'
      }),
    userID: integer('user_id')
      .notNull()
      .references(() => users.id)
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.recipeID, table.userID]
      })
    }
  ]
);
