import { Controller, Delete, Param, Post } from '@nestjs/common';
import { PostLikeService } from './post-like.service';

@Controller('post/:id/like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Post()
  like(@Param() id: string) {
    return this.postLikeService.like(+id);
  }

  @Delete()
  unlike(@Param() id: string) {
    return this.postLikeService.unlike(+id);
  }
}
