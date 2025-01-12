import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DBService } from '../../common/services/db.service';
import { posts } from '@db/posts';
import { and, eq } from 'drizzle-orm';
import { users } from '@db/users';

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

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.db
      .update(posts)
      .set({
        content: updatePostDto.content,
        rating: updatePostDto.rating,
        recipeID: updatePostDto.recipeID
      })
      .where(and(eq(posts.id, id), eq(posts.authorID, this.userID)));
  }

  async remove(id: number) {
    await this.db
      .delete(users)
      .where(and(eq(posts.id, id), eq(posts.authorID, this.userID)));
  }
}
