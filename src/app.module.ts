import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AppRoutesModule } from './config/app-routes.module';
import { LocalStorageModule } from './config/cls.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './shared/guards/auth.guard';
import { PostModule } from './modules/post/post.module';
import { PostCommentLikeModule } from './modules/post-comment-like/post-comment-like.module';
import { PostLikeModule } from './modules/post-like/post-like.module';
import { PostCommentModule } from './modules/post-comment/post-comment.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { RecipeLikeModule } from './modules/recipe-like/recipe-like.module';
import { FollowModule } from './modules/follow/follow.module';
import { RecipePackModule } from './modules/recipe-pack/recipe-pack.module';

@Module({
    imports: [
        DatabaseModule,
        AppRoutesModule,
        LocalStorageModule,
        AuthModule,
        PostModule,
        PostCommentModule,
        PostLikeModule,
        PostCommentLikeModule,
        RecipeModule,
        RecipeLikeModule,
        FollowModule,
        RecipePackModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthenticatedGuard
        }
    ]
})
export class AppModule {}
