import { Controller, Delete, Param, Post } from '@nestjs/common';
import { PostLikeService } from './post-like.service';

@Controller('post-like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Post(':id')
  like(@Param() id: string) {
    return this.postLikeService.like(+id);
  }

  @Delete(':id')
  unlike(@Param() id: string) {
    return this.postLikeService.unlike(+id);
  }
}
