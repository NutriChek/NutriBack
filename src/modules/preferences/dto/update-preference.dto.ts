import { IsArray, IsIn, IsNumber, IsString, Max, Min } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdatePreferenceDto {
    @IsNumber()
    @Optional()
    activityLevel: number;

    @IsIn(['male', 'female'])
    gender: 'male' | 'female';

    @IsNumber()
    @Min(0)
    @Max(140)
    age: number;

    @IsNumber()
    @Optional()
    weight: number;

    @IsNumber()
    @Optional()
    height: number;

    @IsIn(['no_diet', 'vegetarian', 'vegan', 'pescatarian'])
    diet: 'no_diet' | 'vegetarian' | 'vegan' | 'pescatarian';

    @IsString()
    @IsArray({
        each: true
    })
    allergens: string[];
}
