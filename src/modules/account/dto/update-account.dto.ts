import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { IsUsernameValid } from '../../../common/constraints/username.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Unique username for the user, must follow specific constraints',
    example: 'john_doe',
    minLength: 3,
    maxLength: 40
  })
  @IsString()
  @Length(3, 40)
  @Validate(IsUsernameValid)
  username: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    minLength: 1,
    maxLength: 40
  })
  @IsString()
  @Length(1, 40)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    minLength: 1,
    maxLength: 40
  })
  @IsString()
  @Length(1, 40)
  lastName: string;
}
