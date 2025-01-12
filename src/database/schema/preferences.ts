import { integer, pgEnum, pgTable, real, text } from 'drizzle-orm/pg-core';
import { users } from '@db/users';

export const genderEnum = pgEnum('gender_enum', ['male', 'female']);

export const dietEnum = pgEnum('diet_enum', [
  'no_diet',
  'vegetarian',
  'vegan',
  'pescatarian'
]);

export const preferences = pgTable('preferences', {
  id: integer('id')
    .primaryKey()
    .references(() => users.id),
  activityLevel: real('activity_level').notNull(),
  weight: real('weight').notNull(),
  height: real('height').notNull(),
  gender: genderEnum('gender').notNull(),
  age: integer('age').notNull(),
  allergens: text('allergens').notNull(),
  diet: dietEnum('diet').array().notNull()
});
