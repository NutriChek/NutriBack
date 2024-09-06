import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AppRoutesModule } from './config/app-routes.module';
import { LocalStorageModule } from './config/local-storage.module';
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
import { ProfileModule } from './modules/profile/profile.module';
import { AccountModule } from './modules/account/account.module';
import { FileStorageModule } from './config/file-storage.module';
import { FileServeModule } from './config/file-serve.module';
import { TierModule } from './modules/tier/tier.module';
import { PremiumModule } from './modules/premium/premium.module';
import { GoalModule } from './modules/goal/goal.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';

@Module({
    imports: [
        DatabaseModule,
        AppRoutesModule,
        LocalStorageModule,
        FileStorageModule,
        FileServeModule,
        AuthModule,
        PostModule,
        PostCommentModule,
        PostLikeModule,
        PostCommentLikeModule,
        RecipeModule,
        RecipeLikeModule,
        FollowModule,
        RecipePackModule,
        ProfileModule,
        AccountModule,
        TierModule,
        PremiumModule,
        GoalModule,
        IntelligenceModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthenticatedGuard
        }
    ]
})
export class AppModule {}
