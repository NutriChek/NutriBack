import { Module } from '@nestjs/common';
import { DietaryPlanService } from './dietary-plan.service';
import { DietaryPlanController } from './dietary-plan.controller';
import { CalculatorService } from './calculator.service';

@Module({
  controllers: [DietaryPlanController],
  providers: [DietaryPlanService, CalculatorService]
})
export class DietaryPlanModule {}
