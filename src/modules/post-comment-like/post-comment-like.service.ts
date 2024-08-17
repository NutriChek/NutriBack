import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { and, eq, sql } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { CreateLikeDto } from '../../common/dto/create-like.dto';
import { postCommentLikes } from '../../database/schema/post-comment-likes';
import { postComments } from '../../database/schema/post-comments';

@Injectable()
export class PostCommentLikeService extends DBService {
    isUser(id: number) {
        return and(
            eq(postCommentLikes.userID, this.userID),
            eq(postCommentLikes.commentID, id)
        );
    }

    getLike(id: number) {
        return SqlShortcuts.first(
            this.db.select().from(postCommentLikes).where(this.isUser(id))
        );
    }

    async create(id: number, createLikeDto: CreateLikeDto) {
        const like = await this.getLike(id);

        if (like) {
            if (like.like !== createLikeDto.like) {
                await this.db
                    .update(postCommentLikes)
                    .set({
                        like: createLikeDto.like
                    })
                    .where(this.isUser(id));

                await this.db.update(postComments).set({
                    likes: sql`${postComments.likes} + ${createLikeDto.like ? 1 : -1}`,
                    dislikes: sql`${postComments.dislikes} + ${createLikeDto.like ? -1 : 1}`
                });
            }
        } else {
            if (createLikeDto.like) {
                await this.db.update(postComments).set({
                    likes: sql`${postComments.likes} + 1`
                });
            } else {
                await this.db.update(postComments).set({
                    dislikes: sql`${postComments.likes} + 1`
                });
            }

            await this.db.insert(postCommentLikes).values({
                like: createLikeDto.like,
                commentID: id,
                userID: this.userID
            });
        }
    }

    async remove(id: number) {
        const like = await this.getLike(id);

        if (!like) {
            return;
        }

        await this.db.delete(postCommentLikes).where(this.isUser(id));

        if (like.like) {
            await this.db.update(postComments).set({
                likes: sql`${postComments.likes} - 1`
            });
        } else {
            await this.db.update(postComments).set({
                likes: sql`${postComments.dislikes} - 1`
            });
        }
    }
}
