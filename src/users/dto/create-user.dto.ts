import { ApiProperty } from "@nestjs/swagger";
// create-user.dto.ts
import { IsNotEmpty, IsEmail, IsPhoneNumber, Length } from 'class-validator';

export class CreateUserDto {
 @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  @IsPhoneNumber('IN', { message: 'Invalid mobile number' })
  mobile_no: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;
}