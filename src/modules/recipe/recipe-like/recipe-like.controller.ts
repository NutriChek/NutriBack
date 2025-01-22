import { Controller, Delete, Param, Post } from '@nestjs/common';
import { RecipeLikeService } from './recipe-like.service';

@Controller('recipe/:id/like')
export class RecipeLikeController {
  constructor(private readonly recipeLikeService: RecipeLikeService) {}

  @Post()
  like(@Param() id: string) {
    return this.recipeLikeService.like(+id);
  }

  @Delete()
  unlike(@Param() id: string) {
    return this.recipeLikeService.unlike(+id);
  }
}
