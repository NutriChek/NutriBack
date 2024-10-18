import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { Public } from '../../common/decorators/public.decorator';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { GenerateMealPlanDto } from './dto/generate-meal-plan.dto';
import { AnalyzeFoodDto } from './dto/analyze-food.dto';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { GenerateRecipeImageDto } from './dto/generate-recipe-image.dto';

@Controller()
@Public()
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('generate-recipe')
    generateRecipe(@Body() generateRecipeDto: GenerateRecipeDto) {
        return this.aiService.generateRecipe(generateRecipeDto);
    }

    @Post('generate-recipe-image')
    generateRecipeImage(@Body() generateRecipeImageDto: GenerateRecipeImageDto) {
        return this.aiService.generateRecipeImage(generateRecipeImageDto);
    }

    @Post('generate-meal-plan')
    generateMealPlan(@Body() generateMealPlanDto: GenerateMealPlanDto) {
        return this.aiService.generateMealPlan(generateMealPlanDto);
    }

    @Post('analyze-food')
    analyzeFood(@Body() analyzeFoodDto: AnalyzeFoodDto) {
        return this.aiService.analyzeFood(analyzeFoodDto);
    }

    @Post('modify-recipe')
    modifyRecipe(@Body() modifyRecipeDto: ModifyRecipeDto) {
        return this.aiService.modifyRecipe(modifyRecipeDto);
    }
}
