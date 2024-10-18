import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { DBService } from '../../common/services/db.service';
import { recipes } from '../../database/schema/recipes';
import { users } from '../../database/schema/users';
import { and, eq, exists, or, sql } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { postLikes } from '../../database/schema/post-likes';
import { posts } from '../../database/schema/posts';

@Injectable()
export class RecipeService extends DBService {
    create(createRecipeDto: CreateRecipeDto) {
        return this.db
            .insert(recipes)
            .values({
                name: createRecipeDto.name,
                description: createRecipeDto.description,
                steps: createRecipeDto.steps,
                utensils: createRecipeDto.utensils,
                cookingMethods: createRecipeDto.cookingMethods,
                allergens: createRecipeDto.allergens,
                complexity: createRecipeDto.complexity,
                duration: createRecipeDto.duration,
                private: createRecipeDto.private,
                price: createRecipeDto.price,
                images: [],
                tierID: createRecipeDto.tierID,
                userID: this.userID
            })
            .returning({
                id: recipes.id,
                createdAt: recipes.createdAt
            });
    }

    findRandom() {
        // language=SQL format=false
        return this.db
            .select()
            .from(recipes)
            .orderBy(sql`RANDOM()`)
            .limit(5);
    }

    findRecommended() {}

    findOne(id: number) {
        return SqlShortcuts.first(
            this.db
                .select({
                    id: recipes.id,
                    name: recipes.name,
                    description: recipes.description,
                    steps: recipes.steps,
                    utensils: recipes.utensils,
                    cookingMethods: recipes.cookingMethods,
                    allergens: recipes.allergens,
                    complexity: recipes.complexity,
                    duration: recipes.duration,
                    createdAt: posts.createdAt,
                    likes: recipes.likes,
                    user: SqlShortcuts.userObject,
                    liked: exists(postLikes)
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
                .where(
                    and(
                        eq(recipes.id, id),
                        or(
                            // You can access a recipe only if it is either not private or you created it
                            eq(recipes.private, false),
                            eq(recipes.userID, this.userID)
                        )
                    )
                )
                .limit(1)
        );
    }

    async update(id: number, updateRecipeDto: UpdateRecipeDto) {
        await this.db
            .update(recipes)
            .set({
                name: updateRecipeDto.name,
                description: updateRecipeDto.description,
                steps: updateRecipeDto.steps,
                utensils: updateRecipeDto.utensils,
                cookingMethods: updateRecipeDto.cookingMethods,
                allergens: updateRecipeDto.allergens,
                complexity: updateRecipeDto.complexity,
                duration: updateRecipeDto.duration,
                private: updateRecipeDto.private,
                price: updateRecipeDto.price,
                tierID: updateRecipeDto.tierID
            })
            .where(and(eq(recipes.id, id), eq(recipes.userID, this.userID)));
    }

    async remove(id: number) {
        await this.db
            .delete(recipes)
            .where(and(eq(recipes.id, id), eq(recipes.userID, this.userID)));
    }
}
