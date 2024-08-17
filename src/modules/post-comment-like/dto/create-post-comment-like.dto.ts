import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostCommentLikeDto {
    @IsBoolean()
    @ApiProperty()
    like: boolean;
}
