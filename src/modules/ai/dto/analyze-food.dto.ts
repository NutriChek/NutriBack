import { IsArray, IsOptional, IsString } from 'class-validator';

export class AnalyzeFoodDto {
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
    restrictions: string[];

    nutriments?: {
        name: string;
        quantity: string;
    }[];
}
