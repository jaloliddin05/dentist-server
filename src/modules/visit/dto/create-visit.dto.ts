import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateVisitDto {
  @ApiProperty({
    description: `date`,
    example: '2022-10-15',
  })
  @IsNotEmpty()
  @IsString()
  readonly date: string;

  @ApiProperty({
    description: `start time`,
    example: '9:00',
  })
  @IsNotEmpty()
  @IsString()
  readonly startTime: string;

  @ApiProperty({
    description: `end time`,
    example: '10:00',
  })
  @IsNotEmpty()
  @IsString()
  readonly endTime: string;

  @ApiProperty({
    description: `services ids`,
    example: ['uuid', 'uuid', 'uuid'],
  })
  @IsNotEmpty()
  @IsArray()
  readonly services: string[];

  @ApiProperty({
    description: `doctor`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly doctor: string;

  @ApiProperty({
    description: `patient`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly patient: string;
}

export default CreateVisitDto;
