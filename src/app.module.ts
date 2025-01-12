import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { FollowersModule } from './modules/followers/followers.module';
import { DietaryPlanModule } from './modules/dietary-plan/dietary-plan.module';
import { AppRoutesModule } from './config/app-routes.module';
import { DatabaseModule } from './config/database.module';
import { LocalStorageModule } from './config/local-storage.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './guards/auth.guard';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PostModule } from './modules/post/post.module';
import { RecipeLikeModule } from './modules/recipe-like/recipe-like.module';
import { PostLikeModule } from './modules/post-like/post-like.module';
import { FollowModule } from './modules/follow/follow.module';

@Module({
  imports: [
    AppRoutesModule,
    DatabaseModule,
    LocalStorageModule,
    AccountModule,
    AuthModule,
    FollowersModule,
    DietaryPlanModule,
    RecipeModule,
    PostModule,
    RecipeLikeModule,
    PostLikeModule,
    FollowModule
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
