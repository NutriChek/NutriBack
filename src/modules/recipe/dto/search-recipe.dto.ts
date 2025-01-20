import {
  IsArray,
  IsIn,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min
} from 'class-validator';

export class SearchRecipeDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  minCalories?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxCalories?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minTotalFat?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxTotalFat?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minSugar?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxSugar?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minSodium?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxSodium?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minProtein?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxProtein?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minSaturatedFat?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxSaturatedFat?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minCarbohydrates?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxCarbohydrates?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minFiber?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxFiber?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minCholesterol?: number;

  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxCholesterol?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  minSteps?: number;

  @IsNumber()
  @Max(100)
  @IsOptional()
  maxSteps?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  minPreparationTime?: number;

  @IsNumber()
  @Max(60 * 24 * 14)
  @IsOptional()
  maxPreparationTime?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  minCookingTime?: number;

  @IsNumber()
  @Max(60 * 24 * 14)
  @IsOptional()
  maxCookingTime?: number;

  @IsISO8601()
  @IsOptional()
  minDate?: string;

  @IsISO8601()
  @IsOptional()
  maxDate?: string;

  @IsString()
  @IsArray({
    each: true
  })
  @IsOptional()
  tags?: string[];

  @IsIn(['easy', 'medium', 'hard'])
  @IsArray({
    each: true
  })
  @IsOptional()
  difficulty?: ('easy' | 'medium' | 'hard')[];

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  search?: string;
}
