import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { CreateLikeDto } from '../../common/dto/create-like.dto';

@Controller()
export class PostLikeController {
    constructor(private readonly postLikeService: PostLikeService) {}

    @Post(':id')
    create(@Param('id') id: string, @Body() createLikeDto: CreateLikeDto) {
        return this.postLikeService.create(+id, createLikeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postLikeService.remove(+id);
    }
}
