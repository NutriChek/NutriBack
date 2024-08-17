import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { follows } from '../../database/schema/follows';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class FollowService extends DBService {
    async follow(id: number) {
        await this.db.insert(follows).values({
            follower: this.userID,
            followed: id
        });
    }

    async unfollow(id: number) {
        await this.db
            .delete(follows)
            .where(
                and(eq(follows.follower, this.userID), eq(follows.followed, id))
            );
    }
}
