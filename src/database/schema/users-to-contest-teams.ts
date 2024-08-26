import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { teams } from './teams';

export const usersToContestTeams = pgTable(
    'UserToContestTeam',
    {
        userID: integer('userID')
            .notNull()
            .references(() => users.id),
        teamID: integer('teamID')
            .notNull()
            .references(() => teams.id)
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.userID, table.teamID]
        })
    })
);
