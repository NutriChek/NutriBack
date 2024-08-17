import { Module } from '@nestjs/common';
import { PostCommentLikeService } from './post-comment-like.service';
import { PostCommentLikeController } from './post-comment-like.controller';

@Module({
    controllers: [PostCommentLikeController],
    providers: [PostCommentLikeService]
})
export class PostCommentLikeModule {}
