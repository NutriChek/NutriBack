import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeLikeDto {
    @IsBoolean()
    @ApiProperty()
    like: boolean;
}
