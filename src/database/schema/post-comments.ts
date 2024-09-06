import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { posts } from './posts';

export const postComments = pgTable('Comment', {
    id: serial('id').primaryKey(),
    body: text('body').notNull(),
    likes: integer('likes').notNull().default(0),
    createdAt: timestamp('createdAt', { withTimezone: true })
        .notNull()
        .defaultNow(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    postID: integer('postID')
        .notNull()
        .references(() => posts.id, { onDelete: 'cascade' })
});
