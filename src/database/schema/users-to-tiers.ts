import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { tiers } from './tiers';

export const usersToTiers = pgTable(
    'UserToTier',
    {
        userID: integer('userID')
            .notNull()
            .references(() => users.id),
        tierID: integer('tierID')
            .notNull()
            .references(() => tiers.id)
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.userID, table.tierID]
        })
    })
);
