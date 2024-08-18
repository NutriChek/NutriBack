import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '../../database/schema/users';
import { eq } from 'drizzle-orm';
import { BcryptUtils } from '../../common/utils/bcrypt.utils';
import { RegisterDto } from './dto/register.dto';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { profiles } from '../../database/schema/profiles';

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

        throw new UnauthorizedException('Incorrect email or password');
    }

    async register(registerDto: RegisterDto) {
        const user = await SqlShortcuts.first(
            this.db
                .insert(users)
                .values({
                    email: registerDto.email,
                    firstName: registerDto.firstName,
                    lastName: registerDto.lastName,
                    username: registerDto.username,
                    password: await BcryptUtils.hashPassword(
                        registerDto.password
                    )
                })
                .returning({
                    id: users.id
                })
        );

        await this.db.insert(profiles).values({
            userID: user!.id,
            nutritionalPreferences: {},
            bodyProfile: {}
        });
    }
}
