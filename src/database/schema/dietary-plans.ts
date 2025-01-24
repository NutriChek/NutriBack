import { date, integer, pgTable, real } from 'drizzle-orm/pg-core';

export const dietaryPlans = pgTable('dietary-plans', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  startDate: date('start_date').notNull(),
  target: real('target').notNull()
});
