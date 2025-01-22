import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DietaryPlanModule } from './modules/dietary-plan/dietary-plan.module';
import { DatabaseModule } from './config/database.module';
import { LocalStorageModule } from './config/local-storage.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './guards/auth.guard';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PostModule } from './modules/post/post.module';
import { RecipeLikeModule } from './modules/recipe/recipe-like/recipe-like.module';
import { PostLikeModule } from './modules/post/post-like/post-like.module';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { FollowModule } from './modules/user/follow/follow.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { IntelligenceModule } from './intelligence/intelligence.module';

@Module({
  imports: [
    DatabaseModule,
    LocalStorageModule,
    AccountModule,
    AuthModule,
    DietaryPlanModule,
    RecipeModule,
    PostModule,
    RecipeLikeModule,
    PostLikeModule,
    PreferencesModule,
    UserModule,
    FollowModule,
    IntelligenceModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
