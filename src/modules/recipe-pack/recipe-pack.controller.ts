import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { RecipePackService } from './recipe-pack.service';
import { CreateRecipePackDto } from './dto/create-recipe-pack.dto';
import { UpdateRecipePackDto } from './dto/update-recipe-pack.dto';

@Controller()
export class RecipePackController {
    constructor(private readonly recipePackService: RecipePackService) {}

    @Post()
    create(@Body() createRecipePackDto: CreateRecipePackDto) {
        return this.recipePackService.create(createRecipePackDto);
    }

    @Post(':recipePackID/add/:recipeID')
    addRecipe(
        @Param('recipePackID') recipePackID: string,
        @Param('recipeID') recipeID: string
    ) {
        return this.recipePackService.addRecipe(+recipePackID, +recipeID);
    }

    @Get(':id')
    findAll(@Param('id') id: string) {
        return this.recipePackService.findAll(+id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipePackService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateRecipePackDto: UpdateRecipePackDto
    ) {
        return this.recipePackService.update(+id, updateRecipePackDto);
    }

    @Delete(':recipePackID/add/:recipeID')
    removeRecipe(
        @Param('recipePackID') recipePackID: string,
        @Param('recipeID') recipeID: string
    ) {
        return this.recipePackService.removeRecipe(+recipePackID, +recipeID);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipePackService.remove(+id);
    }
}
