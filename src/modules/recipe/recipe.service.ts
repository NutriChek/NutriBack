import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { DBService } from '../../common/services/db.service';
import { recipes } from '@db/recipes';
import {
  and,
  arrayContains,
  eq,
  gt,
  gte,
  inArray,
  lte,
  SQL
} from 'drizzle-orm';
import { users } from '@db/users';
import { SearchRecipeDto } from './dto/search-recipe.dto';
import { posts } from '@db/posts';
import { alias } from 'drizzle-orm/pg-core';
import {
  cardinality,
  firstRow,
  jsonAgg,
  jsonBuildObject,
  random,
  tsMatches,
  userObject
} from '../../common/utils/drizzle.utils';
import { recipeLikes } from '@db/recipe-likes';

@Injectable()
export class RecipeService extends DBService {
  private readonly shortRecipeObject = {
    id: recipes.id,
    author: userObject,
    name: recipes.name,
    description: recipes.recipeDescription,
    cookingTime: recipes.cookingTime,
    preparationTime: recipes.preparationTime,
    images: recipes.images,
    tags: recipes.tags,
    difficulty: recipes.difficulty,
    likesCount: recipes.likesCount,
    ingredientsCount: recipes.ingredientsCount,
    calories: recipes.calories,
    authorName: recipes.authorName
  };

  async create(createRecipeDto: CreateRecipeDto) {
    await this.db.insert(recipes).values({
      name: createRecipeDto.name,
      recipeDescription: createRecipeDto.description,
      ingredientsCount: createRecipeDto.ingredients.length,
      tags: createRecipeDto.tags,
      preparationTime: createRecipeDto.preparationTime,
      cookingTime: createRecipeDto.cookingTime,
      steps: createRecipeDto.steps,
      source: 'nutricheck',
      stepsCount: createRecipeDto.steps.length,
      ingredients: createRecipeDto.ingredients,
      calories: createRecipeDto.calories,
      carbohydrates: createRecipeDto.carbohydrates,
      fiber: createRecipeDto.fiber,
      protein: createRecipeDto.protein,
      saturatedFat: createRecipeDto.saturatedFat,
      totalFat: createRecipeDto.totalFat,
      sodium: createRecipeDto.sodium,
      sugar: createRecipeDto.sugar,
      cholesterol: createRecipeDto.cholesterol,
      difficulty: createRecipeDto.difficulty,
      authorID: this.userID,
      images: []
    });
  }

  search(searchRecipeDto: SearchRecipeDto, cursor: number) {
    const conditions: SQL[] = [gt(recipes.id, cursor)];

    if (searchRecipeDto.minCalories) {
      conditions.push(gte(recipes.calories, searchRecipeDto.minCalories));
    }

    if (searchRecipeDto.maxCalories) {
      conditions.push(lte(recipes.calories, searchRecipeDto.maxCalories));
    }

    if (searchRecipeDto.minTotalFat) {
      conditions.push(gte(recipes.totalFat, searchRecipeDto.minTotalFat));
    }

    if (searchRecipeDto.maxTotalFat) {
      conditions.push(lte(recipes.totalFat, searchRecipeDto.maxTotalFat));
    }

    if (searchRecipeDto.minSugar) {
      conditions.push(gte(recipes.sugar, searchRecipeDto.minSugar));
    }

    if (searchRecipeDto.maxSugar) {
      conditions.push(lte(recipes.sugar, searchRecipeDto.maxSugar));
    }

    if (searchRecipeDto.minSodium) {
      conditions.push(gte(recipes.sodium, searchRecipeDto.minSodium));
    }

    if (searchRecipeDto.maxSodium) {
      conditions.push(lte(recipes.sodium, searchRecipeDto.maxSodium));
    }

    if (searchRecipeDto.minProtein) {
      conditions.push(gte(recipes.protein, searchRecipeDto.minProtein));
    }

    if (searchRecipeDto.maxProtein) {
      conditions.push(lte(recipes.protein, searchRecipeDto.maxProtein));
    }

    if (searchRecipeDto.minSaturatedFat) {
      conditions.push(
        gte(recipes.saturatedFat, searchRecipeDto.minSaturatedFat)
      );
    }

    if (searchRecipeDto.maxSaturatedFat) {
      conditions.push(
        lte(recipes.saturatedFat, searchRecipeDto.maxSaturatedFat)
      );
    }

    if (searchRecipeDto.minCarbohydrates) {
      conditions.push(
        gte(recipes.carbohydrates, searchRecipeDto.minCarbohydrates)
      );
    }

    if (searchRecipeDto.maxCarbohydrates) {
      conditions.push(
        lte(recipes.carbohydrates, searchRecipeDto.maxCarbohydrates)
      );
    }

    if (searchRecipeDto.minFiber) {
      conditions.push(gte(recipes.fiber, searchRecipeDto.minFiber));
    }

    if (searchRecipeDto.maxFiber) {
      conditions.push(lte(recipes.fiber, searchRecipeDto.maxFiber));
    }

    if (searchRecipeDto.minCholesterol) {
      conditions.push(gte(recipes.cholesterol, searchRecipeDto.minCholesterol));
    }

    if (searchRecipeDto.maxCholesterol) {
      conditions.push(lte(recipes.cholesterol, searchRecipeDto.maxCholesterol));
    }

    if (searchRecipeDto.minSteps) {
      conditions.push(gte(recipes.stepsCount, searchRecipeDto.minSteps));
    }

    if (searchRecipeDto.maxSteps) {
      conditions.push(lte(recipes.stepsCount, searchRecipeDto.maxSteps));
    }

    if (searchRecipeDto.minPreparationTime) {
      conditions.push(
        gte(recipes.preparationTime, searchRecipeDto.minPreparationTime)
      );
    }

    if (searchRecipeDto.maxPreparationTime) {
      conditions.push(
        lte(recipes.preparationTime, searchRecipeDto.maxPreparationTime)
      );
    }

    if (searchRecipeDto.minCookingTime) {
      conditions.push(gte(recipes.cookingTime, searchRecipeDto.minCookingTime));
    }

    if (searchRecipeDto.maxCookingTime) {
      conditions.push(lte(recipes.cookingTime, searchRecipeDto.maxCookingTime));
    }

    if (searchRecipeDto.minDate) {
      conditions.push(gte(recipes.createdAt, searchRecipeDto.minDate));
    }

    if (searchRecipeDto.maxDate) {
      conditions.push(lte(recipes.createdAt, searchRecipeDto.maxDate));
    }

    if (searchRecipeDto.difficulty) {
      conditions.push(inArray(recipes.difficulty, searchRecipeDto.difficulty));
    }

    if (searchRecipeDto.tags) {
      conditions.push(arrayContains(recipes.tags, searchRecipeDto.tags));
    }

    if (searchRecipeDto.search) {
      conditions.push(
        tsMatches(
          recipes.searchable,
          searchRecipeDto.search
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .trim()
            .split(/\s+/)
            .join(' & ')
        )
      );
    }

    if (conditions.length > 1) {
      return this.db
        .select(this.shortRecipeObject)
        .from(recipes)
        .leftJoin(users, eq(users.id, recipes.authorID))
        .where(and(...conditions))
        .limit(10)
        .offset(searchRecipeDto.offset ?? 0);
    }

    return this.db
      .select(this.shortRecipeObject)
      .from(recipes)
      .leftJoin(users, eq(users.id, recipes.authorID))
      .where(conditions[0])
      .limit(10)
      .offset(searchRecipeDto.offset ?? 0);
  }

  recommend() {
    return this.db
      .select(this.shortRecipeObject)
      .from(recipes)
      .where(gt(cardinality(recipes.images), 0))
      .leftJoin(users, eq(users.id, recipes.authorID))
      .orderBy(random())
      .limit(10);
  }

  async getLikedRecipes(cursor: number) {
    const likedRecipes = await this.db
      .select(this.shortRecipeObject)
      .from(recipeLikes)
      .where(and(gt(recipes.id, cursor), eq(recipeLikes.userID, this.userID)))
      .orderBy(recipes.id)
      .innerJoin(recipes, eq(recipes.id, recipeLikes.recipeID))
      .limit(20);

    return {
      recipes: likedRecipes,
      cursor: likedRecipes.length < 20 ? null : likedRecipes.at(-1)!.id
    };
  }

  findOne(id: number) {
    const postUser = alias(users, 'post_user');

    return firstRow(
      this.db
        .select({
          id: recipes.id,
          author: userObject,
          posts: jsonAgg(
            jsonBuildObject({
              id: posts.id,
              author: jsonBuildObject({
                id: postUser.id,
                username: postUser.username,
                picture: postUser.username
              }),
              content: posts.content,
              rating: posts.rating,
              likesCount: posts.likesCount,
              source: posts.source,
              authorName: posts.authorName,
              createdAt: posts.createdAt
            })
          ),
          name: recipes.name,
          description: recipes.recipeDescription,
          ingredients: recipes.ingredients,
          steps: recipes.steps,
          preparationTime: recipes.preparationTime,
          cookingTime: recipes.cookingTime,
          source: recipes.source,
          images: recipes.images,
          tags: recipes.tags,
          calories: recipes.calories,
          carbohydrates: recipes.carbohydrates,
          fiber: recipes.fiber,
          protein: recipes.protein,
          saturatedFat: recipes.saturatedFat,
          totalFat: recipes.totalFat,
          sodium: recipes.sodium,
          sugar: recipes.sugar,
          cholesterol: recipes.cholesterol,
          difficulty: recipes.difficulty,
          authorName: recipes.authorName,
          liked: recipeLikes
        })
        .from(recipes)
        .leftJoin(
          recipeLikes,
          and(
            eq(recipeLikes.recipeID, recipes.id),
            eq(recipeLikes.userID, this.userID)
          )
        )
        .leftJoin(users, eq(users.id, recipes.authorID))
        .leftJoin(posts, eq(posts.recipeID, recipes.id))
        .leftJoin(postUser, eq(posts.authorID, users.id))
        .where(eq(recipes.id, id))
    );
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    await this.db
      .update(recipes)
      .set({
        name: updateRecipeDto.name,
        recipeDescription: updateRecipeDto.description,
        ingredientsCount: updateRecipeDto.ingredients?.length,
        tags: updateRecipeDto.tags,
        preparationTime: updateRecipeDto.preparationTime,
        cookingTime: updateRecipeDto.cookingTime,
        steps: updateRecipeDto.steps,
        stepsCount: updateRecipeDto.steps?.length,
        ingredients: updateRecipeDto.ingredients,
        calories: updateRecipeDto.calories,
        carbohydrates: updateRecipeDto.carbohydrates,
        fiber: updateRecipeDto.fiber,
        protein: updateRecipeDto.protein,
        saturatedFat: updateRecipeDto.saturatedFat,
        totalFat: updateRecipeDto.totalFat,
        sodium: updateRecipeDto.sodium,
        sugar: updateRecipeDto.sugar,
        cholesterol: updateRecipeDto.cholesterol,
        difficulty: updateRecipeDto.difficulty
      })
      .where(and(eq(recipes.id, id), eq(recipes.authorID, id)));
  }

  async remove(id: number) {
    await this.db
      .delete(recipes)
      .where(and(eq(recipes.id, id), eq(recipes.authorID, id)));
  }
}
