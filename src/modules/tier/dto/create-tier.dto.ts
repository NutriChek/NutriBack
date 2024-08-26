import { IsArray, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTierDto {
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    name: string;

    @IsString()
    @Length(1, 5000)
    @ApiProperty()
    description: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    price: number;

    @IsInt()
    @IsArray()
    @ApiProperty()
    order: number[];
}
