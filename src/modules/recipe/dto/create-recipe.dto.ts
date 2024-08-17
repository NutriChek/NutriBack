import { IsArray, IsString, Length } from 'class-validator';
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
}
