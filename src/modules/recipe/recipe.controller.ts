import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { SearchRecipeDto } from './dto/search-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Post('search')
  @HttpCode(200)
  search(
    @Body() searchRecipeDto: SearchRecipeDto,
    @Query('cursor') cursor?: string
  ) {
    return this.recipeService.search(searchRecipeDto, +(cursor ?? 0));
  }

  @Get()
  findMany() {
    return this.recipeService.findMany();
  }

  @Get('recommend')
  recommend() {
    return this.recipeService.recommend();
  }

  @Get('liked')
  getLikedRecipes(@Query() cursor?: string) {
    return this.recipeService.getLikedRecipes(+(cursor ?? 0));
  }

  @Get('featured')
  getFeaturedRecipes() {
    return this.recipeService.getFeaturedRecipes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
