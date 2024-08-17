import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostCommentLikeService } from './post-comment-like.service';
import { CreatePostLikeDto } from '../post-like/dto/create-post-like.dto';

@Controller()
export class PostCommentLikeController {
    constructor(
        private readonly postCommentLikeService: PostCommentLikeService
    ) {}

    @Post(':id')
    create(
        @Param('id') id: string,
        @Body() createPostLikeDto: CreatePostLikeDto
    ) {
        return this.postCommentLikeService.create(+id, createPostLikeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postCommentLikeService.remove(+id);
    }
}
