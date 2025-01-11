import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateCatDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Age must be a number' }
  )
  @Min(0)
  age: number;

  @IsOptional()
  @IsString({ message: 'Breed must be a string' })
  @MinLength(3)
  @MaxLength(50)
  breed?: string;
}
