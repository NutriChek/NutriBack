import { Injectable } from '@nestjs/common';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { DBService } from '../../common/services/db.service';
import { postLikes } from '../../database/schema/post-likes';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class PostLikeService extends DBService {
    async create(id: number, createPostLikeDto: CreatePostLikeDto) {
        await this.db
            .insert(postLikes)
            .values({
                like: createPostLikeDto.like,
                postID: id,
                userID: this.userID
            })
            .onConflictDoUpdate({
                target: [postLikes.postID, postLikes.userID],
                set: {
                    like: createPostLikeDto.like
                }
            });
    }

    async remove(id: number) {
        await this.db
            .delete(postLikes)
            .where(
                and(eq(postLikes.userID, this.userID), eq(postLikes.postID, id))
            );
    }
}
