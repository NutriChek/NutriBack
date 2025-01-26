import { Inject } from '@nestjs/common';
import { ClsService, ClsStore } from 'nestjs-cls';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { recipes } from '@db/recipes';
import { posts } from '@db/posts';

export interface CustomClsStore extends ClsStore {
  userID: number;
}

const schema = {
  recipes: recipes,
  posts: posts
};

export abstract class DBService {
  @Inject('DB')
  protected readonly db: NodePgDatabase<typeof schema>;

  @Inject()
  private readonly clsService: ClsService<CustomClsStore>;

  get userID(): number {
    return this.clsService.get('userID');
  }
}
