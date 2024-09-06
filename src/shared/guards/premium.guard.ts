import { DBService } from '../../common/services/db.service';
import { CanActivate, Injectable } from '@nestjs/common';
import { users } from '../../database/schema/users';
import { eq } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';

@Injectable()
export class PremiumGuard extends DBService implements CanActivate {
    async canActivate(): Promise<boolean> {
        const user = await SqlShortcuts.first(
            this.db
                .select({
                    premium: users.premium
                })
                .from(users)
                .where(eq(users.id, this.userID))
        );

        return !!user?.premium;
    }
}
