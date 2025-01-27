import { IsNumber } from 'class-validator';

export class LogCaloriesDto {
  @IsNumber()
  calories: number;
}
