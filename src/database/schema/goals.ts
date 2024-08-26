import { pgTable, serial } from 'drizzle-orm/pg-core';

export const goals = pgTable('Goal', {
    id: serial('id').primaryKey()
});
