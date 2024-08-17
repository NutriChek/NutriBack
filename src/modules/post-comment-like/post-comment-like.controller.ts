import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostCommentLikeService } from './post-comment-like.service';
import { CreatePostCommentLikeDto } from './dto/create-post-comment-like.dto';

@Controller()
export class PostCommentLikeController {
    constructor(
        private readonly postCommentLikeService: PostCommentLikeService
    ) {}

    @Post(':id')
    create(
        @Param('id') id: string,
        @Body() createPostCommentLikeDto: CreatePostCommentLikeDto
    ) {
        return this.postCommentLikeService.create(
            +id,
            createPostCommentLikeDto
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postCommentLikeService.remove(+id);
    }
}
