import { Controller, Delete, Param, Post } from '@nestjs/common';
import { RecipeLikeService } from './recipe-like.service';

@Controller()
export class RecipeLikeController {
    constructor(private readonly recipeLikeService: RecipeLikeService) {}

    @Post(':id')
    create(@Param('id') id: string) {
        return this.recipeLikeService.create(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipeLikeService.remove(+id);
    }
}
