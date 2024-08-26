import { Injectable } from '@nestjs/common';
import { CreateRecipePackDto } from './dto/create-recipe-pack.dto';
import { UpdateRecipePackDto } from './dto/update-recipe-pack.dto';
import { DBService } from '../../common/services/db.service';
import { recipePacks } from '../../database/schema/recipe-packs';
import { and, eq, sql } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { recipesToRecipePacks } from '../../database/schema/recipes-to-recipe-packs';
import { recipes } from '../../database/schema/recipes';

@Injectable()
export class RecipePackService extends DBService {
    create(createRecipePackDto: CreateRecipePackDto) {
        return this.db
            .insert(recipePacks)
            .values({
                name: createRecipePackDto.name,
                private: createRecipePackDto.private,
                price: createRecipePackDto.price,
                tierID: createRecipePackDto.tierID,
                userID: this.userID
            })
            .returning({
                id: recipePacks.id
            });
    }

    async addRecipe(recipePackID: number, recipeID: number) {
        await this.db.insert(recipesToRecipePacks).values({
            recipePackID,
            recipeID
        });
    }

    findAll(id: number) {
        return this.db
            .select({
                id: recipePacks.id,
                name: recipePacks.name
            })
            .from(recipePacks)
            .where(eq(recipePacks.userID, id));
    }

    findOne(id: number) {
        return this.db
            .select({
                id: recipePacks.id,
                name: recipePacks.name,
                user: SqlShortcuts.userObject,
                recipes: sql`JSONB_BUILD_OBJECT('id', ${recipes.id}, 'name', ${recipes.name}, 'likes', ${recipes.likes}, 'dislikes', ${recipes.dislikes})`
            })
            .from(recipePacks)
            .leftJoin(
                recipesToRecipePacks,
                eq(recipesToRecipePacks.recipePackID, recipePacks.id)
            )
            .leftJoin(recipes, eq(recipes.id, recipesToRecipePacks.recipeID))
            .where(eq(recipePacks.id, id));
    }

    async update(id: number, updateRecipePackDto: UpdateRecipePackDto) {
        await this.db
            .update(recipePacks)
            .set({
                name: updateRecipePackDto.name,
                private: updateRecipePackDto.private,
                price: updateRecipePackDto.price,
                tierID: updateRecipePackDto.tierID
            })
            .where(
                and(eq(recipePacks.id, id), eq(recipePacks.userID, this.userID))
            );
    }

    async removeRecipe(recipePackID: number, recipeID: number) {
        await this.db
            .delete(recipesToRecipePacks)
            .where(
                and(
                    eq(recipesToRecipePacks.recipePackID, recipePackID),
                    eq(recipesToRecipePacks.recipeID, recipeID)
                )
            );
    }

    async remove(id: number) {
        await this.db
            .delete(recipePacks)
            .where(
                and(eq(recipePacks.id, id), eq(recipePacks.userID, this.userID))
            );
    }
}
