import { IsArray, IsOptional, IsString } from 'class-validator';

export class GenerateRecipeDto {
    @IsString()
    prompt: string;

    @IsArray({
        each: true
    })
    @IsString()
    @IsOptional()
    ingredients?: string[];

    @IsArray({
        each: true
    })
    @IsString()
    @IsOptional()
    utensils?: string[];

    @IsArray({
        each: true
    })
    @IsString()
    @IsOptional()
    restrictions?: string[];
}
