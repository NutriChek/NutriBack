import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdatePostDto {
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    title: string;

    @IsString()
    @Length(1, 5000)
    @ApiProperty()
    body: string;
}
