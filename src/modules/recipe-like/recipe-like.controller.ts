import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RecipeLikeService } from './recipe-like.service';
import { CreateLikeDto } from '../../common/dto/create-like.dto';

@Controller()
export class RecipeLikeController {
    constructor(private readonly recipeLikeService: RecipeLikeService) {}

    @Post(':id')
    create(@Param('id') id: string, @Body() createLikeDto: CreateLikeDto) {
        return this.recipeLikeService.create(+id, createLikeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipeLikeService.remove(+id);
    }
}
