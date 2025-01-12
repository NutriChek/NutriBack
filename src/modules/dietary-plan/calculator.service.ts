export class CalculatorService {
  static generateDiet(
    type: 'gain' | 'lose',
    weight: number,
    height: number,
    age: number,
    days: number,
    gender: 'male' | 'female',
    activityLevel: number
  ) {
    const dailyGoal = weight / days;

    const calPerKg = this.calculateCalPerKg();

    const bmr = this.calculateBMR(weight, height, age, gender);

    const tdee = bmr * activityLevel;

    if (type === 'lose') {
    }
  }

  static calculateBMR(
    weight: number,
    height: number,
    age: number,
    gender: 'male' | 'female'
  ) {
    return (
      10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161)
    );
  }

  static calculateCalPerKg() {
    return 7700;
  }
}
