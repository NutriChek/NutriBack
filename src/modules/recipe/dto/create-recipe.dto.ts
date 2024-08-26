import {
    IsArray,
    IsBoolean,
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Length
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    name: string;

    @IsString()
    @Length(1, 5000)
    @ApiProperty()
    description: string;

    @IsString()
    @Length(1, 5000)
    @IsArray()
    @ApiProperty()
    steps: string[];

    @IsString()
    @Length(1, 50)
    @IsArray()
    @ApiProperty()
    utensils: string[];

    @IsString()
    @Length(1, 50)
    @IsArray()
    @ApiProperty()
    cookingMethods: string[];

    @IsString()
    @Length(1, 50)
    @IsArray()
    @ApiProperty()
    allergens: string[];

    @IsIn(['Beginner', 'Intermediate', 'Advanced'])
    @ApiProperty()
    complexity: 'Beginner' | 'Intermediate' | 'Advanced';

    @IsInt()
    @ApiProperty()
    duration: number;

    @IsBoolean()
    @ApiProperty()
    private: boolean;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    tierID?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    price?: number;
}
