import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const postTags = pgTable('PostTags', {
    id: serial('id').primaryKey(),
    name: text('name').notNull()
});
