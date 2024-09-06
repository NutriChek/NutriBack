import {
    boolean,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { tiers } from './tiers';

export const complexityEnum = pgEnum('RecipeComplexity', [
    'Beginner',
    'Intermediate',
    'Advanced'
]);

export const recipes = pgTable('Recipe', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    steps: text('steps').array().notNull(),
    utensils: jsonb('utensils').array().notNull(),
    cookingMethods: text('cookingMethods').array().notNull(),
    allergens: text('allergens').array().notNull(),
    complexity: complexityEnum('complexity').notNull(),
    duration: integer('duration').notNull(),
    private: boolean('private').notNull(),
    price: integer('price'),
    images: text('images').array().notNull(),
    likes: integer('likes').notNull().default(0),
    createdAt: timestamp('createdAt', { withTimezone: true })
        .notNull()
        .defaultNow(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    tierID: integer('tierID').references(() => tiers.id, {
        onDelete: 'set null'
    })
});
