import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { and, eq } from 'drizzle-orm';
import { postCommentLikes } from '../../database/schema/post-comment-likes';
import { CreatePostCommentLikeDto } from './dto/create-post-comment-like.dto';

@Injectable()
export class PostCommentLikeService extends DBService {
    async create(
        id: number,
        createPostCommentLikeDto: CreatePostCommentLikeDto
    ) {
        await this.db
            .insert(postCommentLikes)
            .values({
                like: createPostCommentLikeDto.like,
                commentID: id,
                userID: this.userID
            })
            .onConflictDoUpdate({
                target: [postCommentLikes.commentID, postCommentLikes.userID],
                set: {
                    like: createPostCommentLikeDto.like
                }
            });
    }

    async remove(id: number) {
        await this.db
            .delete(postCommentLikes)
            .where(
                and(
                    eq(postCommentLikes.userID, this.userID),
                    eq(postCommentLikes.commentID, id)
                )
            );
    }
}
