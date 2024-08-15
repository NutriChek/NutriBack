import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { IsPasswordStrong } from '../../../common/constraints/password.constraint';
import { IsUsernameValid } from '../../../common/constraints/username.constraint';

export class RegisterDto {
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

    @IsString()
    @Length(8, 40)
    @Validate(IsPasswordStrong)
    password: string;
}
