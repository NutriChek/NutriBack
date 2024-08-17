import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipePackDto {
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    name: string;
}
