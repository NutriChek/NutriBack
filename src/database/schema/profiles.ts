import { integer, pgTable } from 'drizzle-orm/pg-core';

export const profiles = pgTable('Profile', {
    userID: integer('id').primaryKey()
});
