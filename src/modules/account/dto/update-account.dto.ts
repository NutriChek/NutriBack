import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { IsUsernameValid } from '../../../common/constraints/username.constraint';

export class UpdateAccountDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(3, 40)
    @Validate(IsUsernameValid)
    username: string;

    @IsString()
    @Length(1, 40)
    firstName: string;

    @IsString()
    @Length(1, 40)
    lastName: string;
}
