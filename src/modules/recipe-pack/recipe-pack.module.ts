import { Module } from '@nestjs/common';
import { RecipePackService } from './recipe-pack.service';
import { RecipePackController } from './recipe-pack.controller';

@Module({
  controllers: [RecipePackController],
  providers: [RecipePackService],
})
export class RecipePackModule {}
