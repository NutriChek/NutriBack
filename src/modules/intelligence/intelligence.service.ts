import { Injectable } from '@nestjs/common';
import { ScanToCreateDto } from './dto/scan-to-create.dto';
import { ScanToLogDto } from './dto/scan-to-log.dto';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { DBService } from '../../common/services/db.service';
import { GeminiService } from './gemini.service';
import { Response } from 'express';

@Injectable()
export class IntelligenceService extends DBService {
  constructor(private readonly geminiService: GeminiService) {
    super();
  }

  chat() {}

  scanToCreateRecipe(scanToCreateDto: ScanToCreateDto) {}

  scanToLogMeal(scanToLogDto: ScanToLogDto) {}

  generateRecipe(generateRecipeDto: GenerateRecipeDto, res: Response) {
    return this.geminiService.generateContent(res);
  }

  modifyRecipe(modifyRecipeDto: ModifyRecipeDto) {}
}
