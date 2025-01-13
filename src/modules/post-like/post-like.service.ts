import { Injectable } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { postLikes } from '@db/post-likes';
import { posts } from '@db/posts';
import { and, eq, sql } from 'drizzle-orm';
import { decrement, increment } from '../../common/utils/drizzle.utils';

@Injectable()
export class PostLikeService extends DBService {
  async like(id: number) {
    await this.db.insert(postLikes).values({
      userID: this.userID,
      postID: id
    });

    await this.db.update(posts).set({
      likesCount: increment(posts.likesCount, 1)
    });
  }

  async unlike(id: number) {
    const query = await this.db
      .delete(postLikes)
      .where(and(eq(postLikes.postID, id), eq(postLikes.userID, this.userID)));

    if (query.rowCount && query.rowCount > 0) {
      await this.db.update(posts).set({
        likesCount: decrement(posts.likesCount, 1)
      });
    }
  }
}
