import { PartialType } from '@nestjs/swagger';
import { CreateRecipePackDto } from './create-recipe-pack.dto';

export class UpdateRecipePackDto extends PartialType(CreateRecipePackDto) {}
