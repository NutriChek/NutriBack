import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    title: string;

    @IsString()
    @Length(1, 5000)
    @ApiProperty()
    body: string;

    @IsInt()
    @IsOptional()
    recipeID: number;
}
