import { IsString } from 'class-validator';

export class ScanToCreateDto {
  @IsString()
  image: string;
}
