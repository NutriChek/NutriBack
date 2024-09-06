import { Injectable } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { DBService } from '../../common/services/db.service';
import { postComments } from '../../database/schema/post-comments';
import { users } from '../../database/schema/users';
import { and, eq, exists } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { postCommentLikes } from '../../database/schema/post-comment-likes';

@Injectable()
export class PostCommentService extends DBService {
    async create(createPostCommentDto: CreatePostCommentDto) {
        return this.db
            .insert(postComments)
            .values({
                body: createPostCommentDto.body,
                postID: createPostCommentDto.postID,
                userID: this.userID
            })
            .returning({
                id: users.id
            });
    }

    findAll(id: number) {
        return this.db
            .select({
                id: postComments.id,
                body: postComments.body,
                createdAt: postComments.createdAt,
                likes: postComments.likes,
                user: SqlShortcuts.userObject,
                liked: exists(postCommentLikes)
            })
            .from(postComments)
            .innerJoin(users, eq(users.id, postComments.userID))
            .leftJoin(
                postCommentLikes,
                and(
                    eq(postCommentLikes.userID, this.userID),
                    eq(postCommentLikes.commentID, postComments.id)
                )
            )
            .where(eq(postComments.postID, id));
    }

    async update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
        await this.db
            .update(postComments)
            .set({
                body: updatePostCommentDto.body
            })
            .where(
                and(
                    eq(postComments.id, id),
                    eq(postComments.userID, this.userID)
                )
            );
    }

    async remove(id: number) {
        await this.db
            .delete(postComments)
            .where(
                and(
                    eq(postComments.id, id),
                    eq(postComments.userID, this.userID)
                )
            );
    }
}
