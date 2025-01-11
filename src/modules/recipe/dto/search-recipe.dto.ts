import {
  IsArray,
  IsIn,
  IsISO8601,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class SearchRecipeDto {
  @IsNumber()
  @Min(0)
  @Optional()
  minCalories?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxCalories?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minTotalFat?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxTotalFat?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minSugar?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxSugar?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minSodium?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxSodium?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minProtein?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxProtein?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minSaturatedFat?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxSaturatedFat?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minCarbohydrates?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxCarbohydrates?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minFiber?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxFiber?: number;

  @IsNumber()
  @Min(0)
  @Optional()
  minCholesterol?: number;

  @IsNumber()
  @Max(20000)
  @Optional()
  maxCholesterol?: number;

  @IsNumber()
  @Min(1)
  @Optional()
  minSteps?: number;

  @IsNumber()
  @Max(100)
  @Optional()
  maxSteps?: number;

  @IsNumber()
  @Min(1)
  @Optional()
  minPreparationTime?: number;

  @IsNumber()
  @Max(60 * 24 * 14)
  @Optional()
  maxPreparationTime?: number;

  @IsNumber()
  @Min(1)
  @Optional()
  minCookingTime?: number;

  @IsNumber()
  @Max(60 * 24 * 14)
  @Optional()
  maxCookingTime?: number;

  @IsISO8601()
  @Optional()
  minDate?: string;

  @IsISO8601()
  @Optional()
  maxDate?: string;

  @IsString()
  @IsArray({
    each: true
  })
  @Optional()
  tags?: string[];

  @IsIn(['easy', 'medium', 'hard'])
  @IsArray({
    each: true
  })
  @Optional()
  difficulty?: ('easy' | 'medium' | 'hard')[];

  @IsNumber()
  @Optional()
  offset?: number;
}
