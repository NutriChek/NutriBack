import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DBService } from '../../common/services/db.service';
import { posts } from '@db/posts';
import { and, eq, gt } from 'drizzle-orm';
import { users } from '@db/users';
import { recipes } from '@db/recipes';
import { jsonBuildObject } from '../../common/utils/drizzle.utils';

@Injectable()
export class PostService extends DBService {
  async create(createPostDto: CreatePostDto) {
    await this.db.insert(posts).values({
      content: createPostDto.content,
      rating: createPostDto.rating,
      recipeID: createPostDto.recipeID,
      authorID: this.userID
    });
  }

  async findMany(cursor: number) {
    const fetchedPosts = await this.db
      .select({
        id: posts.id,
        content: posts.content,
        rating: posts.rating,
        likes: posts.likesCount,
        recipe: jsonBuildObject({
          id: recipes.id,
          name: recipes.name,
          images: recipes.images
        })
      })
      .from(posts)
      .where(and(gt(recipes.id, cursor), eq(posts.authorID, this.userID)))
      .orderBy(posts.id)
      .innerJoin(recipes, eq(recipes.id, posts.recipeID))
      .limit(20);

    return {
      posts: fetchedPosts,
      cursor: fetchedPosts.length < 20 ? null : fetchedPosts.at(-1)!.id
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.db
      .update(posts)
      .set({
        content: updatePostDto.content,
        rating: updatePostDto.rating
      })
      .where(and(eq(posts.id, id), eq(posts.authorID, this.userID)));
  }

  async remove(id: number) {
    await this.db
      .delete(users)
      .where(and(eq(posts.id, id), eq(posts.authorID, this.userID)));
  }
}
