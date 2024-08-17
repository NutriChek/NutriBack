import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';

@Controller()
export class PostLikeController {
    constructor(private readonly postLikeService: PostLikeService) {}

    @Post(':id')
    create(
        @Param('id') id: string,
        @Body() createPostLikeDto: CreatePostLikeDto
    ) {
        return this.postLikeService.create(+id, createPostLikeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postLikeService.remove(+id);
    }
}
