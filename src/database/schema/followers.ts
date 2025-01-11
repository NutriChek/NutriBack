import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';

export const followers = pgTable(
  'followers',
  {
    followerID: integer('follower_id')
      .notNull()
      .references(() => users.id),
    followedID: integer('followed_id')
      .notNull()
      .references(() => users.id)
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.followerID, table.followedID]
      })
    }
  ]
);
