import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdatePostCommentDto {
    @IsString()
    @Length(1, 500)
    @ApiProperty()
    body: string;
}
