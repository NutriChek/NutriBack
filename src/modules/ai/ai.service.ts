import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { GenerateMealPlanDto } from './dto/generate-meal-plan.dto';
import { AnalyzeFoodDto } from './dto/analyze-food.dto';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { GenerateRecipeImageDto } from './dto/generate-recipe-image.dto';

@Injectable()
export class AiService {
    constructor(private readonly httpService: HttpService) {}

    async generateRecipe(generateRecipeDto: GenerateRecipeDto) {
        let prompt = `Generate a recipe that follows the following description: "${generateRecipeDto.prompt}". `;

        if (generateRecipeDto.ingredients) {
            prompt += `The recipe should try to include or be made of the following ingredients: ${generateRecipeDto.ingredients.map((ingredient, index) => `${ingredient}${index === generateRecipeDto.ingredients?.length! - 1 ? '' : ', '}`)}. `;
        }

        if (generateRecipeDto.restrictions) {
            prompt += `You should take the in consideration that the user has the following dietary restrictions: ${generateRecipeDto.restrictions.map((ingredient, index) => `${ingredient}${index === generateRecipeDto.restrictions?.length! - 1 ? '' : '; '}`)}. `;
        }

        if (generateRecipeDto.utensils) {
            prompt += `You should include the following utensils in the cooking process: ${generateRecipeDto.utensils.map((ingredient, index) => `${ingredient}${index === generateRecipeDto.utensils?.length! - 1 ? '' : '; '}`)}. `;
        }

        prompt +=
            'The response should be in the JSON format and have the fields description: string, ingredients: object array with name and quantity.';

        return JSON.parse(
            (
                await lastValueFrom(
                    this.httpService.post(
                        'http://localhost:11434/api/generate',
                        {
                            model: 'llama3.2:latest',
                            prompt,
                            stream: false
                        }
                    )
                )
            ).data.response.match(/{[\s\S]*}/)
        );
    }

    async generateRecipeImage(generateRecipeImageDto: GenerateRecipeImageDto) {
        let prompt = `Generate a recipe from the description of the image: "NOT GIVEN"`;

        if (generateRecipeImageDto.prompt) {
            prompt += `The recipe should also take the following description in consideration: "${generateRecipeImageDto.prompt}". `;
        }

        if (generateRecipeImageDto.ingredients) {
            prompt += `The recipe should try to include or be made of the following ingredients: ${generateRecipeImageDto.ingredients.map((ingredient, index) => `${ingredient}${index === generateRecipeImageDto.ingredients?.length! - 1 ? '' : ', '}`)}. `;
        }

        if (generateRecipeImageDto.restrictions) {
            prompt += `You should take the in consideration that the user has the following dietary restrictions: ${generateRecipeImageDto.restrictions.map((ingredient, index) => `${ingredient}${index === generateRecipeImageDto.restrictions?.length! - 1 ? '' : '; '}`)}. `;
        }

        if (generateRecipeImageDto.utensils) {
            prompt += `You should include the following utensils in the cooking process: ${generateRecipeImageDto.utensils.map((ingredient, index) => `${ingredient}${index === generateRecipeImageDto.utensils?.length! - 1 ? '' : '; '}`)}. `;
        }

        prompt +=
            'The response should be in the JSON format and have the fields description: string, ingredients: object array with name and quantity.';

        return JSON.parse(
            (
                await lastValueFrom(
                    this.httpService.post(
                        'http://localhost:11434/api/generate',
                        {
                            model: 'llama3.2:latest',
                            prompt,
                            stream: false
                        }
                    )
                )
            ).data.response.match(/{[\s\S]*}/)
        );
    }

    async generateMealPlan(generateMealPlanDto: GenerateMealPlanDto) {

    }

    // also recommends alternative
    async analyzeFood(analyzeFoodDto: AnalyzeFoodDto) {
        let prompt = `Given the following recipe: ${analyzeFoodDto.prompt}; `;

        if (analyzeFoodDto.ingredients) {
            prompt += `That uses the following ingredients: ${analyzeFoodDto.ingredients.map((ingredient, index) => `${ingredient}${index === analyzeFoodDto.ingredients?.length! - 1 ? '' : ', '}`)}; `;
        }

        if (analyzeFoodDto.nutriments) {
            prompt += `That has the following approximate nutriments: ${analyzeFoodDto.nutriments.map((ingredient, index) => `${ingredient}${index === analyzeFoodDto.nutriments?.length! - 1 ? '' : ', '}`)}`;
        }

        prompt += `Verify that it follows the following restrictions: ${analyzeFoodDto.restrictions.map((ingredient, index) => `${ingredient}${index === analyzeFoodDto.restrictions?.length! - 1 ? '' : ', '}`)}.`;

        prompt +=
            'The response should be in the JSON format and have the fields isOk: boolean, objection: string (what should be modified if anything).';

        return JSON.parse(
            (
                await lastValueFrom(
                    this.httpService.post(
                        'http://localhost:11434/api/generate',
                        {
                            model: 'llama3.2:latest',
                            prompt,
                            stream: false
                        }
                    )
                )
            ).data.response.match(/{[\s\S]*}/)
        );
    }

    async modifyRecipe(modifyRecipeDto: ModifyRecipeDto) {
        let prompt = `Given that this existing recipe: "${modifyRecipeDto.recipe}", modify it such that it: `;

        if (modifyRecipeDto.prompt) {
            prompt += `Should have the following modifications: "${modifyRecipeDto.prompt}". `;
        }

        if (modifyRecipeDto.ingredients) {
            prompt += `has the following ingredients: ${modifyRecipeDto.ingredients.map((ingredient, index) => `${ingredient}${index === modifyRecipeDto.ingredients?.length! - 1 ? '' : ', '}`)}. `;
        }

        if (modifyRecipeDto.restrictions) {
            prompt += `Follows the following restrictions: ${modifyRecipeDto.restrictions.map((ingredient, index) => `${ingredient}${index === modifyRecipeDto.restrictions?.length! - 1 ? '' : '; '}`)}. `;
        }

        if (modifyRecipeDto.utensils) {
            prompt += `Uses the following utensils: ${modifyRecipeDto.utensils.map((ingredient, index) => `${ingredient}${index === modifyRecipeDto.utensils?.length! - 1 ? '' : '; '}`)}. `;
        }

        if (modifyRecipeDto.nutriments) {
            prompt += `Tries to follow the nutriments: ${modifyRecipeDto.nutriments.map((ingredient, index) => `${ingredient}${index === modifyRecipeDto.nutriments?.length! - 1 ? '' : '; '}`)}. `;
        }

        prompt +=
            'The response should be in the JSON format and have the fields description: string, ingredients: object array with name and quantity.';

        return JSON.parse(
            (
                await lastValueFrom(
                    this.httpService.post(
                        'http://localhost:11434/api/generate',
                        {
                            model: 'llama3.2:latest',
                            prompt,
                            stream: false
                        }
                    )
                )
            ).data.response.match(/{[\s\S]*}/)
        );
    }
}
