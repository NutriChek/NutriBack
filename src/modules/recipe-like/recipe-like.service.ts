import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { DBService } from '../../common/services/db.service';
import { recipeLikes } from '../../database/schema/recipe-likes';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { recipes } from '../../database/schema/recipes';
import { CreateLikeDto } from '../../common/dto/create-like.dto';

@Injectable()
export class RecipeLikeService extends DBService {
    isUser(id: number) {
        return and(
            eq(recipeLikes.userID, this.userID),
            eq(recipeLikes.recipeID, id)
        );
    }

    getLike(id: number) {
        return SqlShortcuts.first(
            this.db.select().from(recipeLikes).where(this.isUser(id))
        );
    }

    async create(id: number, createRecipeDto: CreateLikeDto) {
        const like = await this.getLike(id);

        if (like) {
            if (like.like !== createRecipeDto.like) {
                await this.db
                    .update(recipeLikes)
                    .set({
                        like: createRecipeDto.like
                    })
                    .where(this.isUser(id));

                await this.db.update(recipes).set({
                    likes: sql`${recipes.likes} + ${createRecipeDto.like ? 1 : -1}`,
                    dislikes: sql`${recipes.dislikes} + ${createRecipeDto.like ? -1 : 1}`
                });
            }
        } else {
            if (createRecipeDto.like) {
                await this.db.update(recipes).set({
                    likes: sql`${recipes.likes} + 1`
                });
            } else {
                await this.db.update(recipes).set({
                    dislikes: sql`${recipes.likes} + 1`
                });
            }

            await this.db.insert(recipeLikes).values({
                like: createRecipeDto.like,
                recipeID: id,
                userID: this.userID
            });
        }
    }

    async remove(id: number) {
        const like = await this.getLike(id);

        if (!like) {
            return;
        }

        await this.db.delete(recipeLikes).where(this.isUser(id));

        if (like.like) {
            await this.db.update(recipes).set({
                likes: sql`${recipes.likes} - 1`
            });
        } else {
            await this.db.update(recipes).set({
                likes: sql`${recipes.dislikes} - 1`
            });
        }
    }
}
