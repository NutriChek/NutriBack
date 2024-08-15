import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('User', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    username: text('username').notNull().unique(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    password: text('password').notNull()
});
