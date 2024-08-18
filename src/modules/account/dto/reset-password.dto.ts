import { IsString, Length, Validate } from 'class-validator';
import { IsPasswordStrong } from '../../../common/constraints/password.constraint';

export class ResetPasswordDto {
    @IsString()
    @Length(8, 40)
    @Validate(IsPasswordStrong)
    password: string;
}
