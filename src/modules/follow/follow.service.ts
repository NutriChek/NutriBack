import { BadRequestException, Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { follows } from '../../database/schema/follows';
import { and, eq, sql } from 'drizzle-orm';
import { users } from '../../database/schema/users';

@Injectable()
export class FollowService extends DBService {
    async follow(id: number) {
        if (id === this.userID) {
            throw new BadRequestException("You can't follow yourself");
        }

        await this.db.insert(follows).values({
            follower: this.userID,
            followed: id
        });

        await this.db
            .update(users)
            .set({
                following: sql`${users.following} + 1`
            })
            .where(eq(users.id, this.userID));

        await this.db
            .update(users)
            .set({
                followers: sql`${users.followers} + 1`
            })
            .where(eq(users.id, id));
    }

    async unfollow(id: number) {
        if (id === this.userID) {
            throw new BadRequestException("You can't unfollow yourself");
        }

        const follow = await this.db
            .delete(follows)
            .where(
                and(eq(follows.follower, this.userID), eq(follows.followed, id))
            )
            .returning({});

        if (follow.length === 1) {
            await this.db
                .update(users)
                .set({
                    following: sql`${users.following} - 1`
                })
                .where(eq(users.id, this.userID));

            await this.db
                .update(users)
                .set({
                    followers: sql`${users.followers} - 1`
                })
                .where(eq(users.id, id));
        } else {
            throw new BadRequestException('You are not following this account');
        }
    }
}
