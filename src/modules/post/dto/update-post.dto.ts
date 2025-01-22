import {IsNumber, IsString, Length, Max, Min} from "class-validator";

export class UpdatePostDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsNumber()
    recipeID: number;

    @IsString()
    @Length(1, 2000)
    content: string;
}
