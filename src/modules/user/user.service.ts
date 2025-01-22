import { Injectable } from '@nestjs/common';
import { users } from '@db/users';
import { eq } from 'drizzle-orm';
import { DBService } from '../../common/services/db.service';

@Injectable()
export class UserService extends DBService {
  findOne(id: number) {
    return this.db
      .select({
        username: users.username,
        picture: users.picture,
        followers: users.followers,
        follows: users.follows
      })
      .from(users)
      .where(eq(users.id, id));
  }
}
