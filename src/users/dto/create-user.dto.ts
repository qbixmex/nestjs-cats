import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString({ message: 'Role must be a string' })
  role?: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
