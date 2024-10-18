import { integer, pgTable } from 'drizzle-orm/pg-core';
import { postTags } from './post-tags';
import { posts } from './posts';

const tagsToPosts = pgTable('TagToPost', {
    tagID: integer('tagID')
        .notNull()
        .references(() => postTags.id),
    postID: integer('postID')
        .notNull()
        .references(() => posts.id)
});
