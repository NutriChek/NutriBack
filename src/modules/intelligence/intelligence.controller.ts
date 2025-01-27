import { Body, Controller, Param, Post } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { ScanToCreateDto } from './dto/scan-to-create.dto';
import { ScanToLogDto } from './dto/scan-to-log.dto';
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

  @Post('modify-recipe/:id')
  modifyRecipe(
    @Param('id') id: string,
    @Body() modifyRecipeDto: ModifyRecipeDto
  ) {
    return this.intelligenceService.modifyRecipe(+id, modifyRecipeDto);
  }
}
