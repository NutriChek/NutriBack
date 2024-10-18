import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller()
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipeService.create(createRecipeDto);
    }

    @Get('random')
    findRandom() {
        return this.recipeService.findRandom();
    }

    @Get('recommended')
    findRecommended() {
        return this.recipeService.findRecommended();
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
