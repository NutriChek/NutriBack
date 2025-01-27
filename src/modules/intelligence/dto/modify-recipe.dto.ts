import { IsString, Validate } from 'class-validator';

export class ModifyRecipeDto {
  @Validate((value: string) => value.trim() !== '', {
    message: 'message should not be empty after trimming'
  })
  @IsString()
  message: string;
}
