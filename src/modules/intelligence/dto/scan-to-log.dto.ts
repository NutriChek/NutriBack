import { IsString } from 'class-validator';

export class ScanToLogDto {
  @IsString()
  image: string;
}
