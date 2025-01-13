type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';

interface CalculatorParams {
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  totalDays: number;
  currentDay?: number;
  currentProgress?: number;
}

interface CalculationResult {
  dailyCalories: number;
  tdee: number;
  weeklyChangeRate: string;
  adjustedTotalDays: number;
  adaptiveFactor: string;
  expectedCompletion: number;
  isSafeRate: boolean;
  recommendations: {
    minProteinGrams: number;
    minFiberGrams: number;
    waterLiters: number;
    mealFrequency: number;
  };
}

export class CalculatorService {
  static calculateBMR(
    weight: number,
    height: number,
    age: number,
    gender: Gender
  ): number {
    if (gender.toLowerCase() === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  static getActivityMultiplier(activityLevel: ActivityLevel): number {
    const multipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };
    return multipliers[activityLevel.toLowerCase() as ActivityLevel] || 1.2;
  }

  static calculateDailyCalories({
    currentWeight,
    targetWeight,
    height,
    age,
    gender,
    activityLevel,
    totalDays,
    currentDay = 0,
    currentProgress
  }: CalculatorParams): CalculationResult {
    const bmr = this.calculateBMR(currentWeight, height, age, gender);
    const activityMultiplier = this.getActivityMultiplier(activityLevel);
    const tdee = bmr * activityMultiplier;

    const totalChange = targetWeight - currentWeight;
    const isWeightLoss = totalChange < 0;

    const maxWeeklyLoss = currentWeight * 0.01;
    const maxWeeklyGain = currentWeight * 0.005;

    const totalWeeks = totalDays / 7;
    const targetWeeklyChange = totalChange / totalWeeks;

    let safeWeeklyChange: number;

    if (isWeightLoss) {
      safeWeeklyChange = Math.max(targetWeeklyChange, -maxWeeklyLoss);
    } else {
      safeWeeklyChange = Math.min(targetWeeklyChange, maxWeeklyGain);
    }

    const adjustedTotalDays = Math.ceil((totalChange / safeWeeklyChange) * 7);

    const baseCalorieChange = (safeWeeklyChange * 7700) / 7;

    let adaptiveFactor = 1;
    const progressPhase = currentDay / totalDays;

    if (progressPhase > 0) {
      adaptiveFactor =
        1 + Math.min(progressPhase * 0.2, 0.2) * (isWeightLoss ? -1 : 1);
    }

    if (currentProgress !== undefined) {
      const expectedWeight =
        currentWeight + totalChange * (currentDay / totalDays);
      const progressDiff = currentProgress - expectedWeight;
      const adjustmentDirection = isWeightLoss ? -1 : 1;
      const progressAdjustment =
        Math.min(Math.abs(progressDiff) * 0.15, 0.15) *
        (progressDiff > 0 ? adjustmentDirection : -adjustmentDirection);
      adaptiveFactor -= progressAdjustment;
    }

    let dailyCalories = tdee + baseCalorieChange * adaptiveFactor;

    const minCalories = gender.toLowerCase() === 'male' ? 1500 : 1200;
    dailyCalories = Math.max(dailyCalories, minCalories);

    const expectedWeightLoss = (baseCalorieChange * adaptiveFactor * 7) / 7700;
    const expectedWeeklyChange = expectedWeightLoss * 7;

    return {
      dailyCalories: Math.round(dailyCalories),
      tdee: Math.round(tdee),
      weeklyChangeRate: expectedWeeklyChange.toFixed(2),
      adjustedTotalDays,
      adaptiveFactor: adaptiveFactor.toFixed(2),
      expectedCompletion: currentDay + adjustedTotalDays,
      isSafeRate:
        Math.abs(expectedWeeklyChange) <=
        (isWeightLoss ? maxWeeklyLoss : maxWeeklyGain),
      recommendations: {
        minProteinGrams: Math.round(currentWeight * 2),
        minFiberGrams: 25,
        waterLiters: Math.round(currentWeight * 0.033 * 10) / 10,
        mealFrequency: isWeightLoss ? 4 : 3
      }
    };
  }
}
