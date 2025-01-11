import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { users } from '@db/users';

@Injectable()
export class SqlShortcuts {
    static readonly userObject = sql`JSONB_BUILD_OBJECT('id', ${users.id}, 'username', ${users.username}, 'picture', ${users.picture})`;

    static async first<T>(promise: Promise<T[]>): Promise<T | undefined> {
        return (await promise)[0];
    }
}
