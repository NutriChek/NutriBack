import { integer, pgTable } from 'drizzle-orm/pg-core';
import { recipes } from '@db/recipes';

export const featuredRecipes = pgTable('featured_recipes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  recipeID: integer('recipe_id')
    .notNull()
    .references(() => recipes.id)
});
