import { IsArray, IsOptional, IsString } from 'class-validator';

export class ModifyRecipeDto {
    @IsString()
    prompt: string;

    @IsString()
    recipe: string;

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

    nutriments?: string[];
}
