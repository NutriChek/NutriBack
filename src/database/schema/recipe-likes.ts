import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { posts } from '@db/posts';
import { users } from '@db/users';

export const recipeLikes = pgTable(
  'recipe_likes',
  {
    recipeID: integer('recipe_id')
      .notNull()
      .references(() => posts.id),
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
