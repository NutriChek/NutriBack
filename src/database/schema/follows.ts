import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';

export const follows = pgTable(
    'Follow',
    {
        follower: integer('follower')
            .notNull()
            .references(() => users.id),
        followed: integer('followed')
            .notNull()
            .references(() => users.id)
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.follower, table.followed]
        })
    })
);
