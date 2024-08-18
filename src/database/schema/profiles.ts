import { integer, jsonb, pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';

export const profiles = pgTable('Profile', {
    userID: integer('id')
        .primaryKey()
        .references(() => users.id, {
            onDelete: 'cascade'
        }),
    bodyProfile: jsonb('bodyProfile').notNull().default({}),
    nutritionalPreferences: jsonb('nutritionalPreferences')
        .notNull()
        .default({})
});
