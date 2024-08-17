import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { postLikes } from '../../database/schema/post-likes';
import { and, eq, sql } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { posts } from '../../database/schema/posts';
import { CreateLikeDto } from '../../common/dto/create-like.dto';

@Injectable()
export class PostLikeService extends DBService {
    isUser(id: number) {
        return and(eq(postLikes.userID, this.userID), eq(postLikes.postID, id));
    }

    getLike(id: number) {
        return SqlShortcuts.first(
            this.db.select().from(postLikes).where(this.isUser(id))
        );
    }

    async create(id: number, createLikeDto: CreateLikeDto) {
        const like = await this.getLike(id);

        if (like) {
            if (like.like !== createLikeDto.like) {
                await this.db
                    .update(postLikes)
                    .set({
                        like: createLikeDto.like
                    })
                    .where(this.isUser(id));

                await this.db.update(posts).set({
                    likes: sql`${posts.likes} + ${createLikeDto.like ? 1 : -1}`,
                    dislikes: sql`${posts.dislikes} + ${createLikeDto.like ? -1 : 1}`
                });
            }
        } else {
            if (createLikeDto.like) {
                await this.db.update(posts).set({
                    likes: sql`${posts.likes} + 1`
                });
            } else {
                await this.db.update(posts).set({
                    dislikes: sql`${posts.likes} + 1`
                });
            }

            await this.db.insert(postLikes).values({
                like: createLikeDto.like,
                postID: id,
                userID: this.userID
            });
        }
    }

    async remove(id: number) {
        const like = await this.getLike(id);

        if (!like) {
            return;
        }

        await this.db.delete(postLikes).where(this.isUser(id));

        if (like.like) {
            await this.db.update(posts).set({
                likes: sql`${posts.likes} - 1`
            });
        } else {
            await this.db.update(posts).set({
                likes: sql`${posts.dislikes} - 1`
            });
        }
    }
}
