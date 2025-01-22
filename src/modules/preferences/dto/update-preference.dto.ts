import { IsArray, IsIn, IsNumber, IsString, Max, Min } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePreferenceDto {
  @ApiPropertyOptional({
    description: 'Activity level (numerical value)',
    example: 3
  })
  @IsNumber()
  @Optional()
  activityLevel: number;

  @ApiProperty({
    description: 'Gender of the user',
    example: 'male',
    enum: ['male', 'female']
  })
  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  @ApiProperty({
    description: 'Age of the user',
    example: 25,
    minimum: 0,
    maximum: 140
  })
  @IsNumber()
  @Min(0)
  @Max(140)
  age: number;

  @ApiPropertyOptional({
    description: 'Weight of the user in kilograms',
    example: 70
  })
  @IsNumber()
  @Optional()
  weight: number;

  @ApiPropertyOptional({
    description: 'Height of the user in centimeters',
    example: 175
  })
  @IsNumber()
  @Optional()
  height: number;

  @ApiProperty({
    description: 'Dietary preference of the user',
    example: 'vegetarian',
    enum: ['no_diet', 'vegetarian', 'vegan', 'pescatarian']
  })
  @IsIn(['no_diet', 'vegetarian', 'vegan', 'pescatarian'])
  diet: 'no_diet' | 'vegetarian' | 'vegan' | 'pescatarian';

  @ApiProperty({
    description: 'List of allergens',
    example: ['nuts', 'gluten'],
    type: [String]
  })
  @IsString()
  @IsArray({
    each: true
  })
  allergens: string[];
}
