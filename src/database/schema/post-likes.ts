import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { posts } from '@db/posts';
import { users } from '@db/users';

export const postLikes = pgTable(
  'post_likes',
  {
    postID: integer('post_id')
      .notNull()
      .references(() => posts.id, {
        onDelete: 'cascade'
      }),
    userID: integer('user_id')
      .notNull()
      .references(() => users.id)
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.postID, table.userID]
      })
    }
  ]
);
