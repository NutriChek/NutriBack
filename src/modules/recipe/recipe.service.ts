import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { DBService } from '../../common/services/db.service';
import { recipes } from '../../database/schema/recipes';
import { users } from '../../database/schema/users';
import { and, eq } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { postLikes } from '../../database/schema/post-likes';
import { posts } from '../../database/schema/posts';

@Injectable()
export class RecipeService extends DBService {
    create(createRecipeDto: CreateRecipeDto) {
        return this.db
            .insert(recipes)
            .values({
                title: createRecipeDto.title,
                description: createRecipeDto.description,
                steps: createRecipeDto.steps,
                userID: this.userID
            })
            .returning({
                id: recipes.id
            });
    }

    findAll() {
        return this.db
            .select({
                id: recipes.id,
                title: recipes.title,
                createdAt: posts.createdAt,
                likes: recipes.likes,
                dislikes: recipes.dislikes,
                user: SqlShortcuts.userObject,
                liked: postLikes.like
            })
            .from(recipes)
            .innerJoin(users, eq(users.id, recipes.userID))
            .leftJoin(
                postLikes,
                and(
                    eq(postLikes.userID, this.userID),
                    eq(postLikes.postID, posts.id)
                )
            );
    }

    findOne(id: number) {
        return SqlShortcuts.first(
            this.db
                .select({
                    id: recipes.id,
                    title: recipes.title,
                    description: recipes.description,
                    steps: recipes.steps,
                    createdAt: posts.createdAt,
                    likes: recipes.likes,
                    dislikes: recipes.dislikes,
                    user: SqlShortcuts.userObject,
                    liked: postLikes.like
                })
                .from(recipes)
                .innerJoin(users, eq(users.id, recipes.userID))
                .leftJoin(
                    postLikes,
                    and(
                        eq(postLikes.userID, this.userID),
                        eq(postLikes.postID, posts.id)
                    )
                )
                .where(eq(recipes.id, id))
        );
    }

    async update(id: number, updateRecipeDto: UpdateRecipeDto) {
        await this.db
            .update(recipes)
            .set({
                title: updateRecipeDto.title,
                description: updateRecipeDto.description,
                steps: updateRecipeDto.steps
            })
            .where(and(eq(recipes.id, id), eq(recipes.userID, this.userID)));
    }

    async remove(id: number) {
        await this.db
            .delete(recipes)
            .where(and(eq(recipes.id, id), eq(recipes.userID, this.userID)));
    }
}
