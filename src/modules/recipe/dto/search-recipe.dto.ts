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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchRecipeDto {
  @ApiPropertyOptional({ description: 'Minimum calories', example: 100 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minCalories?: number;

  @ApiPropertyOptional({ description: 'Maximum calories', example: 2000 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxCalories?: number;

  @ApiPropertyOptional({ description: 'Minimum total fat', example: 10 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minTotalFat?: number;

  @ApiPropertyOptional({ description: 'Maximum total fat', example: 100 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxTotalFat?: number;

  @ApiPropertyOptional({ description: 'Minimum sugar', example: 5 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minSugar?: number;

  @ApiPropertyOptional({ description: 'Maximum sugar', example: 50 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxSugar?: number;

  @ApiPropertyOptional({ description: 'Minimum sodium', example: 500 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minSodium?: number;

  @ApiPropertyOptional({ description: 'Maximum sodium', example: 2000 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxSodium?: number;

  @ApiPropertyOptional({ description: 'Minimum protein', example: 20 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minProtein?: number;

  @ApiPropertyOptional({ description: 'Maximum protein', example: 150 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxProtein?: number;

  @ApiPropertyOptional({ description: 'Minimum saturated fat', example: 2 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minSaturatedFat?: number;

  @ApiPropertyOptional({ description: 'Maximum saturated fat', example: 20 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxSaturatedFat?: number;

  @ApiPropertyOptional({ description: 'Minimum carbohydrates', example: 50 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minCarbohydrates?: number;

  @ApiPropertyOptional({ description: 'Maximum carbohydrates', example: 300 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxCarbohydrates?: number;

  @ApiPropertyOptional({ description: 'Minimum fiber', example: 5 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minFiber?: number;

  @ApiPropertyOptional({ description: 'Maximum fiber', example: 50 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxFiber?: number;

  @ApiPropertyOptional({ description: 'Minimum cholesterol', example: 50 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minCholesterol?: number;

  @ApiPropertyOptional({ description: 'Maximum cholesterol', example: 300 })
  @IsNumber()
  @Max(20000)
  @IsOptional()
  maxCholesterol?: number;

  @ApiPropertyOptional({ description: 'Minimum number of steps', example: 3 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  minSteps?: number;

  @ApiPropertyOptional({ description: 'Maximum number of steps', example: 10 })
  @IsNumber()
  @Max(100)
  @IsOptional()
  maxSteps?: number;

  @ApiPropertyOptional({
    description: 'Minimum preparation time in minutes',
    example: 10
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  minPreparationTime?: number;

  @ApiPropertyOptional({
    description: 'Maximum preparation time in minutes',
    example: 120
  })
  @IsNumber()
  @Max(60 * 24 * 14)
  @IsOptional()
  maxPreparationTime?: number;

  @ApiPropertyOptional({
    description: 'Minimum cooking time in minutes',
    example: 20
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  minCookingTime?: number;

  @ApiPropertyOptional({
    description: 'Maximum cooking time in minutes',
    example: 180
  })
  @IsNumber()
  @Max(60 * 24 * 14)
  @IsOptional()
  maxCookingTime?: number;

  @ApiPropertyOptional({
    description: 'Earliest date for the recipe',
    example: '2025-01-01'
  })
  @IsISO8601()
  @IsOptional()
  minDate?: string;

  @ApiPropertyOptional({
    description: 'Latest date for the recipe',
    example: '2025-12-31'
  })
  @IsISO8601()
  @IsOptional()
  maxDate?: string;

  @ApiPropertyOptional({
    description: 'List of tags',
    example: ['vegetarian', 'gluten-free']
  })
  @IsString()
  @IsArray({
    each: true
  })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'List of difficulties',
    example: ['easy', 'medium']
  })
  @IsIn(['easy', 'medium', 'hard'])
  @IsArray({
    each: true
  })
  @IsOptional()
  difficulty?: ('easy' | 'medium' | 'hard')[];

  @ApiPropertyOptional({ description: 'Pagination offset', example: 0 })
  @IsNumber()
  @IsOptional()
  offset?: number;

  @ApiPropertyOptional({
    description: 'Search term',
    example: 'chocolate cake'
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  search?: string;
}
