import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { postLikes } from '../../database/schema/post-likes';
import { and, eq, sql } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { posts } from '../../database/schema/posts';

@Injectable()
export class PostLikeService extends DBService {
    getLike(id: number) {
        return SqlShortcuts.first(
            this.db
                .select()
                .from(postLikes)
                .where(
                    and(
                        eq(postLikes.userID, this.userID),
                        eq(postLikes.postID, id)
                    )
                )
        );
    }

    async create(id: number) {
        const like = await this.getLike(id);

        if (like) {
            return;
        }

        await this.db.insert(postLikes).values({
            userID: this.userID,
            postID: id
        });

        await this.db
            .update(posts)
            .set({
                likes: sql`${posts.likes}
                + 1`
            })
            .where(eq(posts.id, id));
    }

    async remove(id: number) {
        const like = await this.getLike(id);

        if (!like) {
            return;
        }

        await this.db
            .delete(postLikes)
            .where(
                and(eq(postLikes.userID, this.userID), eq(postLikes.postID, id))
            );

        await this.db
            .update(posts)
            .set({
                likes: sql`${posts.likes}
                - 1`
            })
            .where(eq(posts.id, id));
    }
}
