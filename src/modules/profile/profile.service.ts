import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DBService } from '../../common/services/db.service';
import { profiles } from '../../database/schema/profiles';
import { eq } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { users } from '../../database/schema/users';

@Injectable()
export class ProfileService extends DBService {
    findOwn() {
        return SqlShortcuts.first(
            this.db
                .select()
                .from(profiles)
                .where(eq(profiles.userID, this.userID))
        );
    }

    findOne(id: number) {
        return this.db
            .select({
                id: users.id,
                username: users.username,
                following: users.following,
                followers: users.followers
            })
            .from(users)
            .where(eq(users.id, id));
    }

    async update(updateProfileDto: UpdateProfileDto) {
        await this.db
            .update(profiles)
            .set({
                bodyProfile: updateProfileDto.bodyProfile,
                nutritionalPreferences: updateProfileDto.nutritionalPreferences
            })
            .where(eq(profiles.userID, this.userID));
    }
}
