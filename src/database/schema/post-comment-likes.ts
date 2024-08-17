import { boolean, integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { postComments } from './post-comments';

export const postCommentLikes = pgTable(
    'CommentLike',
    {
        commentID: integer('commentID')
            .notNull()
            .references(() => postComments.id),
        userID: integer('userID')
            .notNull()
            .references(() => users.id),
        like: boolean('like').notNull()
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.commentID, table.userID]
        })
    })
);
