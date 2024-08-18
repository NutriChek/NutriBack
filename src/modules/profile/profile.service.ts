import { Injectable } from '@nestjs/common';
import { UpdateBodyProfileDto } from './dto/update-body-profile.dto';
import { DBService } from '../../common/services/db.service';
import { profiles } from '../../database/schema/profiles';
import { eq } from 'drizzle-orm';
import { UpdateNutritionalPreferencesDto } from './dto/update-nutritional-preferences.dto';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';

@Injectable()
export class ProfileService extends DBService {
    findBodyProfile() {
        return SqlShortcuts.first(
            this.db
                .select({
                    bodyProfile: profiles.bodyProfile
                })
                .from(profiles)
                .where(eq(profiles.userID, this.userID))
        );
    }

    findNutritionalPreferences() {
        return SqlShortcuts.first(
            this.db
                .select({
                    nutritionalPreferences: profiles.nutritionalPreferences
                })
                .from(profiles)
                .where(eq(profiles.userID, this.userID))
        );
    }

    async updateBodyProfile(updateBodyProfileDto: UpdateBodyProfileDto) {
        await this.db
            .update(profiles)
            .set({
                bodyProfile: updateBodyProfileDto.bodyProfile
            })
            .where(eq(profiles.userID, this.userID));
    }

    async updateNutritionalPreferences(
        updateNutritionalPreferencesDto: UpdateNutritionalPreferencesDto
    ) {
        await this.db
            .update(profiles)
            .set({
                bodyProfile:
                    updateNutritionalPreferencesDto.nutritionalPreferences
            })
            .where(eq(profiles.userID, this.userID));
    }
}
