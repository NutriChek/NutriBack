import {
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text
} from 'drizzle-orm/pg-core';
import { users } from '@db/users';

export const difficultyEnum = pgEnum('difficulty_enum', [
  'easy',
  'medium',
  'hard'
]);

export const recipes = pgTable('recipes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  source: text('source').notNull(),
  originalID: text('original_id'),
  name: text('name').notNull(),
  createdAt: date('created_at').notNull().defaultNow(),
  preparationTime: integer('preparation_time').notNull(),
  cookingTime: integer('cooking_time').notNull(),
  tags: text('tags').array().notNull(),
  stepsCount: integer('steps_count').notNull(),
  steps: text('steps').array().notNull(),
  recipeDescription: text('description').notNull(),
  ingredientsCount: integer('ingredients_count').notNull(),
  ingredients: jsonb('ingredients').array().notNull(),
  calories: real('calories'),
  totalFat: real('total_fat'),
  sugar: real('sugar'),
  sodium: real('sodium'),
  protein: real('protein'),
  saturatedFat: real('saturated_fat'),
  carbohydrates: real('carbohydrates'),
  cholesterol: real('cholesterol'),
  fiber: real('fiber'),
  likesCount: integer('likes').notNull().default(0),
  authorName: text('author_name'),
  authorID: integer('author_id').references(() => users.id),
  images: text('images').array().notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  servings: integer('servings'),
  servingSize: integer('serving_size')
});
