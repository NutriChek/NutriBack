import { Body, Injectable } from '@nestjs/common';
import { CreateDietaryPlanDto } from './dto/create-dietary-plan.dto';
import { UpdateDietaryPlanDto } from './dto/update-dietary-plan.dto';
import { CalculatorService } from './calculator.service';
import { LogCaloriesDto } from './dto/log-calories.dto';
import { DBService } from '../../common/services/db.service';
import { dietaryLogs } from '@db/dietary-logs';
import { and, desc, eq } from 'drizzle-orm';
import { firstRow } from '../../common/utils/drizzle.utils';
import { recipes } from '@db/recipes';

@Injectable()
export class DietaryPlanService extends DBService {
  constructor(private readonly calculatorService: CalculatorService) {
    super();
  }

  async getTarget() {
    const logs = await this.db
      .select({
        calories: dietaryLogs.calories
      })
      .from(dietaryLogs)
      .where(and(eq(dietaryLogs.userID, this.userID)));

    const consumed = logs.reduce((S, x) => x.calories + S, 0);

    return {
      target: 2200,
      consumed
    };
  }

  getLogs() {
    return this.db
      .select()
      .from(dietaryLogs)
      .where(eq(dietaryLogs.userID, this.userID))
      .orderBy(desc(dietaryLogs.createdAt));
  }

  async logCalories(@Body() logCaloriesDto: LogCaloriesDto) {
    await this.db.insert(dietaryLogs).values({
      calories: logCaloriesDto.calories,
      userID: this.userID,
      details: {
        source: 'manual_log'
      }
    });
  }

  async logRecipe(id: number) {
    const recipe = await firstRow(
      this.db
        .select({
          calories: recipes.calories,
          id: recipes.id
        })
        .from(recipes)
        .where(eq(recipes.id, id))
    );

    await this.db.insert(dietaryLogs).values({
      calories: recipe!.calories ?? 0,
      userID: this.userID,
      details: {
        source: 'recipe_log',
        recipeID: recipe?.id ?? null
      }
    });
  }

  create(createDietaryPlanDto: CreateDietaryPlanDto) {
    return 'This action adds a new dietaryPlan';
  }

  findAll() {
    return `This action returns all dietaryPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dietaryPlan`;
  }

  update(id: number, updateDietaryPlanDto: UpdateDietaryPlanDto) {
    return `This action updates a #${id} dietaryPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} dietaryPlan`;
  }
}
