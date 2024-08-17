import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { users } from '../../database/schema/users';

@Injectable()
export class SqlShortcuts {
    static readonly userObject = sql`JSONB_BUILD_OBJECT('id', ${users.id}, 'username', ${users.username})`;
}
