import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../infra/shared/enum';
class CreateClientRequestDto {
  @ApiProperty({
    description: `name`,
    example: 'John Doe Mark',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `birthday`,
    example: '10-05-2000',
  })
  @IsNotEmpty()
  @IsString()
  readonly birthday: string;

  @ApiProperty({
    description: `phone`,
    example: '+998998887766',
  })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty({
    description: `comment`,
    example: 'something',
  })
  @IsNotEmpty()
  @IsString()
  readonly comment: string;

  @ApiProperty({
    description: `gender`,
    example: GenderEnum.MALE,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly gender: GenderEnum;

  @ApiProperty({
    description: `date`,
    example: '2022-10-23',
  })
  @IsNotEmpty()
  @IsString()
  readonly date: string;

  @ApiProperty({
    description: `time`,
    example: '12:00',
  })
  @IsNotEmpty()
  @IsString()
  readonly time: string;

  @ApiProperty({
    description: `services`,
    example: ['uuid', 'uuid', 'uuid'],
  })
  @IsOptional()
  @IsArray()
  readonly services: string[];
}

export default CreateClientRequestDto;
