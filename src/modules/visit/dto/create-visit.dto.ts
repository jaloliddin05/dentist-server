import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../infra/shared/enum';
class CreateServiceDto {
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
  birthday: string;

  @ApiProperty({
    description: `phone`,
    example: '+998998887766',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: `date`,
    example: '2022-10-15',
  })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({
    description: `start time`,
    example: '9:00',
  })
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty({
    description: `end time`,
    example: '10:00',
  })
  @IsNotEmpty()
  @IsString()
  endTime: string;

  @ApiProperty({
    description: `gender`,
    example: GenderEnum.MALE,
  })
  @IsNotEmpty()
  @IsString()
  gender: GenderEnum;

  @ApiProperty({
    description: `address`,
    example: 'tashkent, uol street',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: `services ids`,
    example: ['uuid', 'uuid', 'uuid'],
  })
  @IsNotEmpty()
  @IsString()
  services: string[];

  @ApiProperty({
    description: `doctor`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  doctor: string;
}

export default CreateServiceDto;
