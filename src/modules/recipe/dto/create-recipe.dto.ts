import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class IngredientDto {
  @ApiProperty({ description: 'Name of the ingredient', example: 'Flour' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Unit of measurement', example: 'grams' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ description: 'Quantity of the ingredient', example: '500' })
  @IsString()
  @IsNotEmpty()
  quantity: string;
}

export class CreateRecipeDto {
  @ApiProperty({ description: 'Name of the recipe', example: 'Chocolate Cake' })
  @IsString()
  @Length(3, 250)
  name: string;

  @ApiProperty({
    description: 'Tags associated with the recipe',
    example: ['dessert', 'chocolate'],
    type: [String]
  })
  @IsString()
  @IsNotEmpty()
  @IsArray({
    each: true
  })
  tags: string[];

  @ApiProperty({
    description: 'Steps to prepare the recipe',
    example: ['Mix ingredients', 'Bake at 180°C for 30 minutes'],
    type: [String]
  })
  @IsString()
  @IsNotEmpty()
  @IsArray({
    each: true
  })
  steps: string[];

  @ApiProperty({
    description: 'Description of the recipe',
    example: 'A rich and moist chocolate cake perfect for dessert.',
    minLength: 3,
    maxLength: 2000
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 2000)
  description: string;

  @ApiProperty({
    description: 'List of ingredients required for the recipe',
    type: [IngredientDto]
  })
  @ValidateNested()
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @ApiProperty({ description: 'Preparation time in minutes', example: 20 })
  @IsNumber()
  @Min(0)
  preparationTime: number;

  @ApiProperty({ description: 'Cooking time in minutes', example: 30 })
  @IsNumber()
  @Min(0)
  cookingTime: number;

  @ApiProperty({ description: 'Number of servings', example: 4 })
  @IsNumber()
  @Min(0)
  servings: number;

  @ApiProperty({ description: 'Calories per serving', example: 500 })
  @IsNumber()
  @Min(0)
  calories: number;

  @ApiProperty({
    description: 'Total fat content per serving in grams',
    example: 20
  })
  @IsNumber()
  @Min(0)
  totalFat: number;

  @ApiProperty({
    description: 'Sugar content per serving in grams',
    example: 10
  })
  @IsNumber()
  @Min(0)
  sugar: number;

  @ApiProperty({
    description: 'Sodium content per serving in milligrams',
    example: 150
  })
  @IsNumber()
  @Min(0)
  sodium: number;

  @ApiProperty({
    description: 'Protein content per serving in grams',
    example: 5
  })
  @IsNumber()
  @Min(0)
  protein: number;

  @ApiProperty({
    description: 'Saturated fat content per serving in grams',
    example: 8
  })
  @IsNumber()
  @Min(0)
  saturatedFat: number;

  @ApiProperty({
    description: 'Carbohydrates content per serving in grams',
    example: 70
  })
  @IsNumber()
  @Min(0)
  carbohydrates: number;

  @ApiProperty({
    description: 'Fiber content per serving in grams',
    example: 5
  })
  @IsNumber()
  @Min(0)
  fiber: number;

  @ApiProperty({
    description: 'Cholesterol content per serving in milligrams',
    example: 40
  })
  @IsNumber()
  @Min(0)
  cholesterol: number;

  @ApiProperty({
    description: 'Difficulty level of the recipe',
    example: 'medium',
    enum: ['easy', 'medium', 'hard']
  })
  @IsIn(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';
}
