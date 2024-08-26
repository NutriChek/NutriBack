import { pgTable, serial } from 'drizzle-orm/pg-core';

export const contests = pgTable('Contest', {
    id: serial('id').primaryKey()
});
