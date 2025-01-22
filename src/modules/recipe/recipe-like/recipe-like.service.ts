import { Injectable } from '@nestjs/common';
import { DBService } from '../../../common/services/db.service';
import { and, eq } from 'drizzle-orm';
import { recipeLikes } from '@db/recipe-likes';
import { recipes } from '@db/recipes';
import { decrement, increment } from '../../../common/utils/drizzle.utils';

@Injectable()
export class RecipeLikeService extends DBService {
  async like(id: number) {
    await this.db.insert(recipeLikes).values({
      userID: this.userID,
      recipeID: id
    });

    await this.db.update(recipes).set({
      likesCount: increment(recipes.likesCount, 1)
    });
  }

  async unlike(id: number) {
    const query = await this.db
      .delete(recipeLikes)
      .where(
        and(eq(recipeLikes.recipeID, id), eq(recipeLikes.userID, this.userID))
      );

    if (query.rowCount! > 0) {
      await this.db.update(recipes).set({
        likesCount: decrement(recipes.likesCount, 1)
      });
    }
  }
}
