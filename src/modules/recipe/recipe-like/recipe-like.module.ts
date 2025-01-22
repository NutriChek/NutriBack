import { Module } from '@nestjs/common';
import { RecipeLikeService } from './recipe-like.service';
import { RecipeLikeController } from './recipe-like.controller';

@Module({
  controllers: [RecipeLikeController],
  providers: [RecipeLikeService],
})
export class RecipeLikeModule {}
