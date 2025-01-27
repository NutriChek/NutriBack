import { Injectable } from '@nestjs/common';
import { ScanToCreateDto } from './dto/scan-to-create.dto';
import { ScanToLogDto } from './dto/scan-to-log.dto';
import { DBService } from '../../common/services/db.service';
import { AiService } from './ai.service';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';

@Injectable()
export class IntelligenceService extends DBService {
  constructor(private readonly geminiService: AiService) {
    super();
  }

  scanToCreateRecipe(scanToCreateDto: ScanToCreateDto) {}

  scanToLogMeal(scanToLogDto: ScanToLogDto) {}

  modifyRecipe(modifyRecipeDto: ModifyRecipeDto) {}
}
