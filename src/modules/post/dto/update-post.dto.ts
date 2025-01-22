import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Rating given to the recipe, between 1 and 5',
    example: 4,
    minimum: 1,
    maximum: 5
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Content of the post / review',
    example:
      'This recipe was amazing! I loved the flavors and the simplicity of preparation.',
    minLength: 1,
    maxLength: 2000
  })
  @IsString()
  @Length(1, 2000)
  content: string;
}
