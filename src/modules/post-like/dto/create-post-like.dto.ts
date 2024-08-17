import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostLikeDto {
    @IsBoolean()
    @ApiProperty()
    like: boolean;
}
