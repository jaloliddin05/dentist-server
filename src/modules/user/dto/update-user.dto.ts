import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateUserDto {
  @ApiProperty({
    description: `Password`,
    example: 'password',
  })
  @IsOptional()
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

  @ApiProperty({
    description: `position`,
    example: 'dentist',
  })
  @IsOptional()
  @IsString()
  readonly position: string;

  @ApiProperty({
    description: `description`,
    example: `i'm ...`,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: `address`,
    example: 'Usa, Washington,',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    description: `login`,
    example: 'asd',
  })
  @IsOptional()
  @IsString()
  login: string;

  @ApiProperty({
    description: `Article image`,
    example: 'file',
    type: 'string',
    format: 'binary',
  })
  avatar;
}

export default UpdateUserDto;
