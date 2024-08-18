import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateProfileDto {
    @IsObject()
    @IsOptional()
    @ApiProperty()
    bodyProfile: Record<string, any>;

    @IsObject()
    @IsOptional()
    @ApiProperty()
    nutritionalPreferences: Record<string, any>;
}
