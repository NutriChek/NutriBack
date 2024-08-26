import { Injectable } from '@nestjs/common';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { users } from '../../database/schema/users';
import { eq } from 'drizzle-orm';
import { DBService } from '../../common/services/db.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { BcryptUtils } from '../../common/utils/bcrypt.utils';

@Injectable()
export class AccountService extends DBService {
    async updatePicture(file: Express.Multer.File) {
        await this.db
            .update(users)
            .set({
                picture: file.filename
            })
            .where(eq(users.id, this.userID));
    }

    findOwn() {
        return SqlShortcuts.first(
            this.db
                .select({
                    id: users.id,
                    username: users.username,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    email: users.email,
                    followers: users.followers,
                    following: users.following
                })
                .from(users)
                .where(eq(users.id, this.userID))
        );
    }

    findOne(id: number) {
        return this.db
            .select({
                id: users.id,
                username: users.username,
                following: users.following,
                followers: users.followers
            })
            .from(users)
            .where(eq(users.id, id));
    }

    async update(updateAccountDto: UpdateAccountDto) {
        await this.db
            .update(users)
            .set({
                username: updateAccountDto.username,
                email: updateAccountDto.email,
                firstName: updateAccountDto.firstName,
                lastName: updateAccountDto.lastName
            })
            .where(eq(users.id, this.userID));
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        await this.db
            .update(users)
            .set({
                password: await BcryptUtils.hashPassword(
                    resetPasswordDto.password
                )
            })
            .where(eq(users.id, this.userID));
    }
}
