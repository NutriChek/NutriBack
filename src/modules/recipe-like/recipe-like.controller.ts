import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RecipeLikeService } from './recipe-like.service';
import { CreateRecipeLikeDto } from './dto/create-recipe-like.dto';

@Controller()
export class RecipeLikeController {
    constructor(private readonly recipeLikeService: RecipeLikeService) {}

    @Post(':id')
    create(
        @Param('id') id: string,
        @Body() createRecipeLikeDto: CreateRecipeLikeDto
    ) {
        return this.recipeLikeService.create(+id, createRecipeLikeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipeLikeService.remove(+id);
    }
}
