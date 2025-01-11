import { PartialType } from '@nestjs/swagger';
import { CreateDietaryPlanDto } from './create-dietary-plan.dto';

export class UpdateDietaryPlanDto extends PartialType(CreateDietaryPlanDto) {}
