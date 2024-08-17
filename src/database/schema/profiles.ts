import { boolean, date, integer, pgTable } from 'drizzle-orm/pg-core';

export const profiles = pgTable('Profile', {
    userID: integer('id').primaryKey(),
    weight: integer('weight').notNull(),
    height: integer('height').notNull(),
    dob: date('dob').notNull(),
    pregnancyTrimester: integer('pregnancyTrimester').notNull(),
    breastFeeding: boolean('breastFeeding').notNull(),
    allergens: integer('allergens').array().notNull()
});
