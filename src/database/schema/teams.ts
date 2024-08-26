import { pgTable, serial } from 'drizzle-orm/pg-core';

export const teams = pgTable('Team', {
    id: serial('id').primaryKey()
});
