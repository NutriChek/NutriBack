import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DBService } from '../../common/services/db.service';
import { posts } from '../../database/schema/posts';
import { users } from '../../database/schema/users';
import { and, eq } from 'drizzle-orm';
import { SqlShortcuts } from '../../common/services/sql-shortcuts.service';
import { postLikes } from '../../database/schema/post-likes';
import { recipes } from '../../database/schema/recipes';

@Injectable()
export class PostService extends DBService {
    create(createPostDto: CreatePostDto) {
        return this.db
            .insert(posts)
            .values({
                body: createPostDto.body,
                title: createPostDto.title,
                userID: this.userID,
                recipeID: createPostDto.recipeID
            })
            .returning({
                id: posts.id,
                createdAt: recipes.createdAt
            });
    }

    findAll() {
        return this.db
            .select({
                id: posts.id,
                title: posts.title,
                createdAt: posts.createdAt,
                likes: posts.likes,
                dislikes: posts.dislikes,
                user: SqlShortcuts.userObject,
                liked: postLikes.like
            })
            .from(posts)
            .innerJoin(users, eq(users.id, posts.userID))
            .leftJoin(
                postLikes,
                and(
                    eq(postLikes.userID, this.userID),
                    eq(postLikes.postID, posts.id)
                )
            );
    }

    findOne(id: number) {
        return SqlShortcuts.first(
            this.db
                .select({
                    id: posts.id,
                    title: posts.title,
                    body: posts.body,
                    createdAt: posts.createdAt,
                    likes: posts.likes,
                    dislikes: posts.dislikes,
                    user: SqlShortcuts.userObject,
                    liked: postLikes.like
                })
                .from(posts)
                .innerJoin(users, eq(users.id, posts.userID))
                .leftJoin(
                    postLikes,
                    and(
                        eq(postLikes.userID, this.userID),
                        eq(postLikes.postID, posts.id)
                    )
                )
                .where(eq(posts.id, id))
                .limit(1)
        );
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        await this.db
            .update(posts)
            .set({
                body: updatePostDto.body,
                title: updatePostDto.title
            })
            .where(and(eq(posts.id, id), eq(posts.userID, this.userID)));
    }

    async remove(id: number) {
        return this.db
            .delete(posts)
            .where(and(eq(posts.id, id), eq(posts.userID, this.userID)));
    }
}
