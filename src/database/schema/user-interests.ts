import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { users } from './users';
import { postTags } from './post-tags';

export const userInterests = pgTable('UserInterest', {
    id: serial('id').primaryKey(),
    userID: integer('userID')
        .notNull()
        .references(() => users.id),
    tagID: integer('tagID')
        .notNull()
        .references(() => postTags.id)
});
