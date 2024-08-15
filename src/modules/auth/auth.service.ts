import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '../../database/schema/users';
import { eq } from 'drizzle-orm';
import { BcryptUtils } from '../../common/utils/bcrypt.utils';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService extends DBService {
    constructor(private readonly jwtService: JwtService) {
        super();
    }

    async validateUser(
        email: string,
        password: string
    ): Promise<{
        token: string;
    }> {
        const user = (
            await this.db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1)
        )[0];

        if (
            user &&
            (await BcryptUtils.comparePasswords(password, user.password))
        ) {
            return {
                token: this.jwtService.sign({
                    userID: user.id
                })
            };
        }

        return null;
    }

    async register(registerDto: RegisterDto) {
        this.db.insert(users).values({
            email: registerDto.email,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            username: registerDto.username,
            password: await BcryptUtils.hashPassword(registerDto.password)
        });
    }
}
