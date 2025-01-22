import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DBService } from '../../common/services/db.service';
import { users } from '@db/users';
import { eq } from 'drizzle-orm';
import { firstRow } from '../../common/utils/drizzle.utils';

@Injectable()
export class AccountService extends DBService {
  findOwn() {
    return firstRow(
      this.db
        .select({
          id: users.id,
          email: users.email,
          username: users.username,
          firstName: users.firstName,
          lastName: users.lastName,
          picture: users.picture,
          followers: users.followers,
          follows: users.follows
        })
        .from(users)
        .where(eq(users.id, this.userID))
        .limit(1)
    );
  }

  async update(updateAccountDto: UpdateAccountDto) {
    await this.db
      .update(users)
      .set({
        email: updateAccountDto.email,
        username: updateAccountDto.username,
        firstName: updateAccountDto.firstName,
        lastName: updateAccountDto.lastName
      })
      .where(eq(users.id, this.userID));
  }
}
