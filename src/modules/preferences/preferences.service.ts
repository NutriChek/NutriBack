import { Injectable } from '@nestjs/common';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { DBService } from '../../common/services/db.service';
import { preferences } from '@db/preferences';
import { eq } from 'drizzle-orm';
import { firstRow } from '../../common/utils/drizzle.utils';

@Injectable()
export class PreferencesService extends DBService {
  findOne() {
    return firstRow(
      this.db.select().from(preferences).where(eq(preferences.id, this.userID))
    );
  }

  async update(updatePreferenceDto: UpdatePreferenceDto) {
    await this.db
      .update(preferences)
      .set({
        gender: updatePreferenceDto.gender,
        allergens: updatePreferenceDto.allergens,
        age: updatePreferenceDto.age,
        diet: updatePreferenceDto.diet,
        weight: updatePreferenceDto.weight,
        height: updatePreferenceDto.height,
        activityLevel: updatePreferenceDto.activityLevel
      })
      .where(eq(preferences.id, this.userID));
  }
}
