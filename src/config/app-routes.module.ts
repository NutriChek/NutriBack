import { RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from '../modules/auth/auth.module';
import { PostModule } from '../modules/post/post.module';
import { PostCommentModule } from '../modules/post-comment/post-comment.module';
import { PostLikeModule } from '../modules/post-like/post-like.module';
import { PostCommentLikeModule } from '../modules/post-comment-like/post-comment-like.module';
import { RecipeModule } from '../modules/recipe/recipe.module';
import { RecipeLikeModule } from '../modules/recipe-like/recipe-like.module';
import { FollowModule } from '../modules/follow/follow.module';
import { RecipePackModule } from '../modules/recipe-pack/recipe-pack.module';

const routes: Routes = [
    {
        path: 'auth',
        module: AuthModule
    },
    {
        path: 'follow',
        module: FollowModule
    },
    {
        path: 'post',
        module: PostModule,
        children: [
            {
                path: 'comment',
                module: PostCommentModule,
                children: [
                    {
                        path: 'like',
                        module: PostCommentLikeModule
                    }
                ]
            },
            {
                path: 'like',
                module: PostLikeModule
            }
        ]
    },
    {
        path: 'recipe',
        module: RecipeModule,
        children: [
            {
                path: 'like',
                module: RecipeLikeModule
            }
        ]
    },
    {
        path: 'recipe-pack',
        module: RecipePackModule
    }
];

export const AppRoutesModule = RouterModule.register(routes);
