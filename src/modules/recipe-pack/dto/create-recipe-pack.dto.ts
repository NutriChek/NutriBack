import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    Length
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipePackDto {
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    name: string;

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
