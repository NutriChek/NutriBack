import { IsString, Length } from 'class-validator';

export class RenameChatDto {
  @IsString()
  @Length(1, 100)
  name: string;
}
