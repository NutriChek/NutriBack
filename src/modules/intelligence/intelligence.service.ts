import { Injectable } from '@nestjs/common';
import { ScanToCreateDto } from './dto/scan-to-create.dto';
import { ScanToLogDto } from './dto/scan-to-log.dto';
import { DBService } from '../../common/services/db.service';
import { AiService } from './ai.service';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { firstRow } from '../../common/utils/drizzle.utils';
import { recipes } from '@db/recipes';
import { eq } from 'drizzle-orm';
import { dietaryLogs } from '@db/dietary-logs';

@Injectable()
export class IntelligenceService extends DBService {
  constructor(private readonly geminiService: AiService) {
    super();
  }

  scanToCreateRecipe(scanToCreateDto: ScanToCreateDto) {
    return this.geminiService.generateFromImage(scanToCreateDto.image);
  }

  async scanToLogMeal(scanToLogDto: ScanToLogDto) {
    const calories: number = await this.geminiService.estimateCalories(
      scanToLogDto.image
    );

    await this.db.insert(dietaryLogs).values({
      calories,
      userID: this.userID,
      details: {
        source: 'manual_log'
      }
    });
  }

  async modifyRecipe(id: number, modifyRecipeDto: ModifyRecipeDto) {
    const recipe = (await firstRow(
      this.db
        .select({
          name: recipes.name,
          preparationTime: recipes.preparationTime,
          cookingTime: recipes.cookingTime,
          steps: recipes.steps,
          recipeDescription: recipes.recipeDescription,
          ingredients: recipes.ingredients,
          calories: recipes.calories,
          totalFat: recipes.totalFat,
          sugar: recipes.sugar,
          sodium: recipes.sodium,
          protein: recipes.protein,
          saturatedFat: recipes.saturatedFat,
          carbohydrates: recipes.carbohydrates,
          cholesterol: recipes.cholesterol,
          fiber: recipes.fiber,
          difficulty: recipes.difficulty,
          servings: recipes.servings,
          servingSize: recipes.servingSize
        })
        .from(recipes)
        .where(eq(recipes.id, id))
    ))!;

    return await this.geminiService.generateRecipe(
      recipe,
      modifyRecipeDto.message
    );
  }
}
