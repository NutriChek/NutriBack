import { Body, Controller, Post } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { ScanToCreateDto } from './dto/scan-to-create.dto';
import { ScanToLogDto } from './dto/scan-to-log.dto';
import { GenerateRecipeDto } from './dto/generate-recipe.dto';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';

@Controller('intelligence')
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Post('scan-to-create')
  scanToCreateRecipe(@Body() scanToCreateDto: ScanToCreateDto) {
    return this.intelligenceService.scanToCreateRecipe(scanToCreateDto);
  }

  @Post('scan-to-log')
  scanToLogMeal(@Body() scanToLogDto: ScanToLogDto) {
    return this.intelligenceService.scanToLogMeal(scanToLogDto);
  }

  @Post('generate-recipe')
  generateRecipe(@Body() generateRecipeDto: GenerateRecipeDto) {
    return this.intelligenceService.generateRecipe(generateRecipeDto);
  }

  @Post('modify-recipe')
  modifyRecipe(@Body() modifyRecipeDto: ModifyRecipeDto) {
    return this.intelligenceService.modifyRecipe(modifyRecipeDto);
  }
}
