import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { postComments } from './post-comments';

export const postCommentLikes = pgTable(
    'CommentLike',
    {
        commentID: integer('commentID')
            .notNull()
            .references(() => postComments.id, { onDelete: 'cascade' }),
        userID: integer('userID')
            .notNull()
            .references(() => users.id)
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.commentID, table.userID]
        })
    })
);
