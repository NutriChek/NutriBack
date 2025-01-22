import { Injectable } from '@nestjs/common';
import { DBService } from '../../../common/services/db.service';
import { followers } from '@db/followers';
import { and, eq } from 'drizzle-orm';
import { users } from '@db/users';
import { decrement, increment } from '../../../common/utils/drizzle.utils';

@Injectable()
export class FollowService extends DBService {
  async follow(id: number) {
    await this.db.insert(followers).values({
      followerID: this.userID,
      followedID: id
    });

    await this.db
      .update(users)
      .set({
        followers: increment(users.followers, 1)
      })
      .where(eq(users.id, id));

    await this.db
      .update(users)
      .set({
        follows: increment(users.follows, 1)
      })
      .where(eq(users.id, this.userID));
  }

  async unfollow(id: number) {
    const query = await this.db
      .delete(followers)
      .where(
        and(eq(followers.followerID, this.userID), eq(followers.followedID, id))
      );

    if (!query.rowCount || query.rowCount === 0) {
      return;
    }

    await this.db
      .update(users)
      .set({
        followers: decrement(users.followers, 1)
      })
      .where(eq(users.id, id));

    await this.db
      .update(users)
      .set({
        follows: decrement(users.follows, 2)
      })
      .where(eq(users.id, this.userID));
  }
}
