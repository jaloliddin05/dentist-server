import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateUserDto {
  @ApiProperty({
    description: `Password`,
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  password: string;

  @ApiProperty({
    description: `Name`,
    example: 'John Doe Ha',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  // @ApiProperty({
  //   description: `position`,
  //   example: 'dentist',
  // })
  // @IsOptional()
  // @IsString()
  // readonly position: string;

  // @ApiProperty({
  //   description: `description`,
  //   example: `i'm ...`,
  // })
  // @IsOptional()
  // @IsString()
  // description: string;

  // @ApiProperty({
  //   description: `address`,
  //   example: 'Usa, Washington,',
  // })
  // @IsOptional()
  // @IsString()
  // address: string;

  @ApiProperty({
    description: `login`,
    example: 'asd',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  // @ApiProperty({
  //   description: `Article image`,
  //   example: 'file',
  //   type: 'string',
  //   format: 'binary',
  // })
  // avatar;
}

export default CreateUserDto;
