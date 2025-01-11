import { Injectable } from '@nestjs/common';
import { CreateDietaryPlanDto } from './dto/create-dietary-plan.dto';
import { UpdateDietaryPlanDto } from './dto/update-dietary-plan.dto';

@Injectable()
export class DietaryPlanService {
  create(createDietaryPlanDto: CreateDietaryPlanDto) {
    return 'This action adds a new dietaryPlan';
  }

  findAll() {
    return `This action returns all dietaryPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dietaryPlan`;
  }

  update(id: number, updateDietaryPlanDto: UpdateDietaryPlanDto) {
    return `This action updates a #${id} dietaryPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} dietaryPlan`;
  }
}
