import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { DietaryPlanService } from './dietary-plan.service';
import { CreateDietaryPlanDto } from './dto/create-dietary-plan.dto';
import { UpdateDietaryPlanDto } from './dto/update-dietary-plan.dto';
import { LogCaloriesDto } from './dto/log-calories.dto';

@Controller('dietary-plan')
export class DietaryPlanController {
  constructor(private readonly dietaryPlanService: DietaryPlanService) {}

  @Get('target')
  getTarget() {
    return this.dietaryPlanService.getTarget();
  }

  @Get('log')
  getLogs() {
    return this.dietaryPlanService.getLogs();
  }

  @Post('log')
  logCalories(@Body() logCaloriesDto: LogCaloriesDto) {
    return this.dietaryPlanService.logCalories(logCaloriesDto);
  }

  @Post('log/recipe/:id')
  logRecipe(@Param('id') id: string) {
    return this.dietaryPlanService.logRecipe(+id);
  }

  @Post()
  create(@Body() createDietaryPlanDto: CreateDietaryPlanDto) {
    return this.dietaryPlanService.create(createDietaryPlanDto);
  }

  @Get()
  findAll() {
    return this.dietaryPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietaryPlanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDietaryPlanDto: UpdateDietaryPlanDto
  ) {
    return this.dietaryPlanService.update(+id, updateDietaryPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietaryPlanService.remove(+id);
  }
}
