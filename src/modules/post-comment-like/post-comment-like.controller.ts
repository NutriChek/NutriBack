import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostCommentLikeService } from './post-comment-like.service';
import { CreateLikeDto } from '../../common/dto/create-like.dto';

@Controller()
export class PostCommentLikeController {
    constructor(
        private readonly postCommentLikeService: PostCommentLikeService
    ) {}

    @Post(':id')
    create(@Param('id') id: string, @Body() createLikeDto: CreateLikeDto) {
        return this.postCommentLikeService.create(+id, createLikeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postCommentLikeService.remove(+id);
    }
}
