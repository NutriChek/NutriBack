import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { users } from '@db/users';

export const posts = pgTable('posts', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  source: text('source').notNull(),
  authorID: integer('author_id')
    .notNull()
    .references(() => users.id),
  rating: integer('rating').notNull(),
  recipeID: integer('recipe_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: date('created_at').notNull().defaultNow()
});
