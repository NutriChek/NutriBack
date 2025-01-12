import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { users } from '@db/users';
import { recipes } from '@db/recipes';

export const posts = pgTable('posts', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  source: text('source'),
  authorID: integer('author_id').references(() => users.id),
  rating: integer('rating').notNull(),
  recipeID: integer('recipe_id')
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  authorName: text('author_name'),
  originalID: text('original_id'),
  originalRecipeID: text('original_recipe_id'),
  createdAt: date('created_at').notNull().defaultNow(),
  likesCount: integer('likes_count')
});
