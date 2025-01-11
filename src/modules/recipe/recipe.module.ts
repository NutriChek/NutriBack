import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: []
})
export class RecipeModule {}
