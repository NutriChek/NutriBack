import { IsArray, IsOptional, IsString } from 'class-validator';

export class GenerateMealPlanDto {
    nutriments: {
        name: string;
        quantity: string;
    }[];

    @IsArray({
        each: true
    })
    @IsString()
    @IsOptional()
    restrictions?: string[];
}
