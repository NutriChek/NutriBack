import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { DBService } from '../../common/services/db.service';
import { recipeLikes } from '../../database/schema/recipe-likes';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { recipes } from '../../database/schema/recipes';

@Injectable()
export class RecipeLikeService extends DBService {
    getLike(id: number) {
        return SqlShortcuts.first(
            this.db
                .select()
                .from(recipeLikes)
                .where(
                    and(
                        eq(recipeLikes.userID, this.userID),
                        eq(recipeLikes.recipeID, id)
                    )
                )
        );
    }

    async create(id: number) {
        const like = await this.getLike(id);

        if (like) {
            return;
        }

        await this.db.insert(recipeLikes).values({
            userID: this.userID,
            recipeID: id
        });

        await this.db
            .update(recipes)
            .set({
                likes: sql`${recipes.likes} + 1`
            })
            .where(eq(recipes.id, id));
    }

    async remove(id: number) {
        const like = await this.getLike(id);

        if (!like) {
            return;
        }

        await this.db
            .delete(recipeLikes)
            .where(
                and(
                    eq(recipeLikes.userID, this.userID),
                    eq(recipeLikes.recipeID, id)
                )
            );

        await this.db
            .update(recipes)
            .set({
                likes: sql`${recipes.likes}
            - 1`
            })
            .where(eq(recipes.id, id));
    }
}
