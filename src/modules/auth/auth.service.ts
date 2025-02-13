import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '@db/users';
import { eq } from 'drizzle-orm';
import { BcryptUtils } from '../../common/utils/bcrypt.utils';
import { RegisterDto } from './dto/register.dto';
import { preferences } from '@db/preferences';
import { firstRow } from '../../common/utils/drizzle.utils';

@Injectable()
export class AuthService extends DBService {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async validateUser(
    email: string,
    password: string,
    pushToken: string
  ): Promise<{
    token: string;
  }> {
    const user = (
      await this.db.select().from(users).where(eq(users.email, email)).limit(1)
    )[0];

    if (user && (await BcryptUtils.comparePasswords(password, user.password))) {
      return {
        token: this.jwtService.sign({
          userID: user.id,
          pushToken
        })
      };
    }

    throw new UnauthorizedException('Incorrect email or password');
  }

  async register(registerDto: RegisterDto) {
    try {
      const { id } = (await firstRow(
        this.db
          .insert(users)
          .values({
            email: registerDto.email,
            password: await BcryptUtils.hashPassword(registerDto.password),
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            username: registerDto.username
          })
          .returning({
            id: users.id
          })
      ))!;

      await this.db.insert(preferences).values({
        id: id,
        activityLevel: 1,
        gender: 'male',
        age: 30,
        weight: 80,
        height: 170,
        diet: 'no_diet',
        allergens: []
      });
    } catch (e) {
      if (e.code === '23505') {
        const column = (e.detail as string).match(/\((.*?)\)/)![1];

        throw new ConflictException({
          message: `${column} already exists`
        });
      }

      throw new InternalServerErrorException();
    }
  }
}
