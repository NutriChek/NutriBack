import { Controller, Delete, Param, Post } from '@nestjs/common';
import { RecipeLikeService } from './recipe-like.service';

@Controller('recipe-like')
export class RecipeLikeController {
  constructor(private readonly recipeLikeService: RecipeLikeService) {}

  @Post(':id')
  like(@Param() id: string) {
    return this.recipeLikeService.like(+id);
  }

  @Delete(':id')
  unlike(@Param() id: string) {
    return this.recipeLikeService.unlike(+id);
  }
}
