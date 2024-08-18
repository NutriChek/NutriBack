import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateBodyProfileDto {
    @IsObject()
    @ApiProperty()
    bodyProfile: object;
}
