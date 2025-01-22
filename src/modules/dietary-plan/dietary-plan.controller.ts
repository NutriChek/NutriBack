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

@Controller('dietary-plan')
export class DietaryPlanController {
  constructor(private readonly dietaryPlanService: DietaryPlanService) {}

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
