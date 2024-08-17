import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Controller()
export class PostCommentController {
    constructor(private readonly postCommentService: PostCommentService) {}

    @Post()
    create(@Body() createPostCommentDto: CreatePostCommentDto) {
        return this.postCommentService.create(createPostCommentDto);
    }

    @Get(':id')
    findAll(@Param('id') id: string) {
        return this.postCommentService.findAll(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePostCommentDto: UpdatePostCommentDto
    ) {
        return this.postCommentService.update(+id, updatePostCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postCommentService.remove(+id);
    }
}
