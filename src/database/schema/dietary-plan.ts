import { integer, pgTable } from 'drizzle-orm/pg-core';

export const dietaryPlan = pgTable('dietary-plan', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity()
});
