import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class IngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;
}

export class CreateRecipeDto {
  @IsString()
  @Length(3, 250)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @IsArray({
    each: true
  })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @IsArray({
    each: true
  })
  steps: string[];

  @IsString()
  @IsNotEmpty()
  @Length(3, 2000)
  description: string;

  @ValidateNested()
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @IsNumber()
  @Min(0)
  preparationTime: number;

  @IsNumber()
  @Min(0)
  cookingTime: number;

  @IsNumber()
  @Min(0)
  servings: number;

  @IsNumber()
  @Min(0)
  calories: number;

  @IsNumber()
  @Min(0)
  totalFat: number;

  @IsNumber()
  @Min(0)
  sugar: number;

  @IsNumber()
  @Min(0)
  sodium: number;

  @IsNumber()
  @Min(0)
  protein: number;

  @IsNumber()
  @Min(0)
  saturatedFat: number;

  @IsNumber()
  @Min(0)
  carbohydrates: number;

  @IsNumber()
  @Min(0)
  fiber: number;

  @IsNumber()
  @Min(0)
  cholesterol: number;

  @IsIn(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';
}
