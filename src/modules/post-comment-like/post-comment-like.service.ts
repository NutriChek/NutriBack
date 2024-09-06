import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { and, eq, sql } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { postCommentLikes } from '../../database/schema/post-comment-likes';
import { postComments } from '../../database/schema/post-comments';

@Injectable()
export class PostCommentLikeService extends DBService {
    getLike(id: number) {
        return SqlShortcuts.first(
            this.db
                .select()
                .from(postCommentLikes)
                .where(
                    and(
                        eq(postCommentLikes.userID, this.userID),
                        eq(postCommentLikes.commentID, id)
                    )
                )
        );
    }

    async create(id: number) {
        const like = await this.getLike(id);

        if (like) {
            return;
        }

        await this.db.insert(postCommentLikes).values({
            userID: this.userID,
            commentID: id
        });

        await this.db
            .update(postComments)
            .set({
                likes: sql`${postComments.likes}
                + 1`
            })
            .where(eq(postComments.id, id));
    }

    async remove(id: number) {
        const like = await this.getLike(id);

        if (!like) {
            return;
        }

        await this.db
            .delete(postCommentLikes)
            .where(
                and(
                    eq(postCommentLikes.userID, this.userID),
                    eq(postCommentLikes.commentID, id)
                )
            );

        await this.db
            .update(postComments)
            .set({
                likes: sql`${postComments.likes}
                - 1`
            })
            .where(eq(postComments.id, id));
    }
}
