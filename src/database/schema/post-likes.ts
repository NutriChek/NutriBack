import { boolean, integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';

export const postLikes = pgTable(
    'PostLike',
    {
        postID: integer('postID')
            .notNull()
            .references(() => posts.id, {
                onDelete: 'cascade'
            }),
        userID: integer('userID')
            .notNull()
            .references(() => users.id),
        like: boolean('like').notNull()
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.postID, table.userID]
        })
    })
);
