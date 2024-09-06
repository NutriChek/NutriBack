import { Controller, Delete, Param, Post } from '@nestjs/common';
import { PostLikeService } from './post-like.service';

@Controller()
export class PostLikeController {
    constructor(private readonly postLikeService: PostLikeService) {}

    @Post(':id')
    create(@Param('id') id: string) {
        return this.postLikeService.create(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postLikeService.remove(+id);
    }
}
