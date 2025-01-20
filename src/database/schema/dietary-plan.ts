import { date, integer, pgTable, real } from 'drizzle-orm/pg-core';

export const dietaryPlan = pgTable('dietary-plan', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  startDate: date('start_date').notNull(),
  target: real('target').notNull()
});
