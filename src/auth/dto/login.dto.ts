import { Transform } from "class-transformer";
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

class LoginUserDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6)
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  password: string;
}

export default LoginUserDto;
