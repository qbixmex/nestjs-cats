import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateBreedDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3)
  @MaxLength(100)
  name: string;
}
