import { Injectable } from '@nestjs/common';
import {
  Content,
  EnhancedGenerateContentResponse,
  FunctionCallingMode,
  GoogleGenerativeAI,
  Part,
  ResponseSchema,
  SchemaType
} from '@google/generative-ai';
import envConfig from '../../../env.config';
import { Response } from 'express';

@Injectable()
export class AiService {
  private genAI = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);

  async sendStream(
    stream: AsyncGenerator<EnhancedGenerateContentResponse>,
    res: Response
  ) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    let response = '';

    for await (const chunk of stream) {
      const chunkText = chunk.text();

      response += chunkText;

      res.write(chunkText);
    }

    res.end();

    return response;
  }

  recipeSchema: ResponseSchema = {
    description:
      'A food recipe corresponding to the given properties, only if required',
    type: SchemaType.OBJECT,
    properties: {
      name: {
        description: 'The name of the recipe',
        type: SchemaType.STRING
      },
      description: {
        description: 'A medium sized description of the recipe, without steps',
        type: SchemaType.STRING
      },
      steps: {
        description: 'The list of steps for    making the recipe',
        type: SchemaType.ARRAY,
        items: {
          description: 'The instructions of the step',
          type: SchemaType.STRING
        }
      },
      ingredients: {
        description: 'The list of ingredients for the recipe',
        type: SchemaType.ARRAY,
        items: {
          description: 'An ingredient with the specified properties',
          type: SchemaType.OBJECT,
          properties: {
            name: {
              description: 'The name of the ingredient',

              type: SchemaType.STRING
            },
            quantity: {
              description: 'The quantity needed of the ingredient',
              type: SchemaType.NUMBER
            },
            unit: {
              description:
                'The unit of measure for the quantity, lowercased, using the shortened name',
              type: SchemaType.STRING
            }
          },
          required: ['name']
        }
      },
      preparationTime: {
        description: 'The time it takes to prepare for the recipe',
        type: SchemaType.NUMBER
      },
      cookingTime: {
        description: 'The time it takes to make the actual recipe',
        type: SchemaType.NUMBER
      },
      difficulty: {
        description: 'An estimated difficulty for the recipe',
        type: SchemaType.STRING,
        enum: ['easy', 'medium', 'hard']
      },
      servings: {
        description: 'The number of servings obtained from doing the recipes',
        type: SchemaType.NUMBER
      },
      servingSize: {
        description: 'The size of a serving, in grams',
        type: SchemaType.NUMBER
      },
      calories: {
        description: 'The number of calories for the recipe',
        type: SchemaType.NUMBER
      },
      totalFat: {
        description: 'The total fat for the recipe, including saturated fat',
        type: SchemaType.NUMBER
      },
      sugar: {
        description: 'The sugar content for the recipe',
        type: SchemaType.NUMBER
      },
      sodium: {
        description: 'The sodium content for the recipe',
        type: SchemaType.NUMBER
      },
      protein: {
        description: 'The protein content for the recipe',
        type: SchemaType.NUMBER
      },
      saturatedFat: {
        description: 'The saturatedFat content for the recipe',
        type: SchemaType.NUMBER
      },
      carbohydrates: {
        description: 'The carbohydrates content for the recipe',
        type: SchemaType.NUMBER
      },
      cholesterol: {
        description: 'The cholesterol content for the recipe',
        type: SchemaType.NUMBER
      },
      fiber: {
        description: 'The fiber content for the recipe',
        type: SchemaType.NUMBER
      }
    },
    required: [
      'name',
      'description',
      'steps',
      'ingredients',
      'preparationTime',
      'cookingTime',
      'difficulty',
      'servings',
      'servingSize',
      'calories'
    ]
  };

  async sendMessage(history: Content[], message: Part[]) {
    const model = this.genAI.getGenerativeModel({
      model: envConfig.GEMINI_MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            response: {
              description: 'The main body of the response',
              type: SchemaType.STRING
            },
            recipe: this.recipeSchema
          },
          required: ['response']
        }
      },
      // tools: [
      //   {
      //     functionDeclarations: [
      //       {
      //         name: 'find_recipe',
      //         description: 'Searches for recipes in a database'
      //       }
      //     ]
      //   }
      // ],
      systemInstruction:
        'You are a kind, helpful, and cheerful assistant. Respond to every question or request in a polite and friendly tone, showing enthusiasm and a willingness to help. Use language like ‘Of course!’, ‘Sure!’, or ‘I’d be happy to!’ when appropriate, and ensure your explanations are clear and approachable. You may only discuss about these and related topics. You may only generate a recipe if specifically requested to GENERATE A RECIPE, otherwise DO NOT PROVIDE A RECIPE PARAM. The main body of the response must be descriptive and helpful, just like a normal prompt'
    });

    const chat = model.startChat({
      history,
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingMode.AUTO
        }
      }
    });

    const response = await chat.sendMessage(message);

    console.log(response.response.functionCalls());

    const result = JSON.parse(response.response.text());

    if (result.recipe) {
      result.recipe['id'] = -1;
    }

    return result;
  }

  async generateChatName(prompt: string) {
    const model = this.genAI.getGenerativeModel({
      model: envConfig.GEMINI_MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          description: 'Prompt title',
          type: SchemaType.STRING
        }
      }
    });

    const response = await model.generateContent(
      `Generate a short title for the following prompt:
    ${prompt}`
    );

    return JSON.parse(response.response.text());
  }

  async generateRecipe(recipe: any, prompt: string) {
    const model = this.genAI.getGenerativeModel({
      model: envConfig.GEMINI_MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: this.recipeSchema
      },
      systemInstruction:
        'You are a cooking assistant. You must modify the provided recipe according to the given requests, rules and constrains'
    });

    const response = await model.generateContent([
      JSON.stringify(recipe),
      prompt
    ]);

    const result = JSON.parse(response.response.text());

    return {
      ...result,
      id: -1
    };
  }

  async estimateCalories(file: string) {
    const model = this.genAI.getGenerativeModel({
      model: envConfig.GEMINI_MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          description: 'The number of calories in the given recipe',
          type: SchemaType.NUMBER
        }
      },
      systemInstruction:
        'You are a nutritional assistant. You must estimate the number of calories the food in the picture has'
    });

    const response = await model.generateContent([
      {
        inlineData: {
          data: file,
          mimeType: 'image/jpeg'
        }
      }
    ]);

    return JSON.parse(response.response.text());
  }

  async generateFromImage(file: string) {
    const model = this.genAI.getGenerativeModel({
      model: envConfig.GEMINI_MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: this.recipeSchema
      },
      systemInstruction:
        'You are a cooking assistant. You must generate a recipe based on the provided image'
    });

    const response = await model.generateContent([
      {
        inlineData: {
          data: file,
          mimeType: 'image/jpeg'
        }
      }
    ]);

    const result = JSON.parse(response.response.text());

    return {
      ...result,
      id: -1
    };
  }
}
