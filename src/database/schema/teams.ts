import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users';
import { contests } from './contests';

export const teams = pgTable('Team', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    leaderID: integer('leaderID')
        .notNull()
        .references(() => users.id),
    contestID: integer('contestID')
        .notNull()
        .references(() => contests.id)
});
