import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNutritionalPreferencesDto {
    @IsObject()
    @ApiProperty()
    nutritionalPreferences: object;
}
