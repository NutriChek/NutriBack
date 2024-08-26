import { integer, jsonb, pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';

export const profiles = pgTable('Profile', {
    userID: integer('id')
        .primaryKey()
        .references(() => users.id, {
            onDelete: 'cascade'
        }),
    bodyProfile: jsonb('bodyProfile').notNull().default({
        height: 180,
        weight: 100,
        age: 25,
        activityLevel: 1.7,
        sex: 'male',
        pregnant: false,
        trimester: 0,
        breastfeeding: false
    }),
    nutritionalPreferences: jsonb('nutritionalPreferences').notNull().default({
        nutriscore: 4,
        lowSalt: false,
        lowSugar: false,
        lowFat: false,
        lowSaturatedFat: false,
        palmOil: false,
        diet: 'None',
        restricted: [],
        allergens: []
    })
});
