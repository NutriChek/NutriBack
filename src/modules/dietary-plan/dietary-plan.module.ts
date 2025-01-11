import { Module } from '@nestjs/common';
import { DietaryPlanService } from './dietary-plan.service';
import { DietaryPlanController } from './dietary-plan.controller';

@Module({
  controllers: [DietaryPlanController],
  providers: [DietaryPlanService],
})
export class DietaryPlanModule {}
