import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateVisitDto {
  @ApiProperty({
    description: `date`,
    example: '2022-10-15',
  })
  @IsOptional()
  @IsString()
  readonly date: string;

  @ApiProperty({
    description: `start time`,
    example: '9:00',
  })
  @IsOptional()
  @IsString()
  readonly startTime: string;

  @ApiProperty({
    description: `end time`,
    example: '10:00',
  })
  @IsOptional()
  @IsString()
  readonly endTime: string;

  @ApiProperty({
    description: `patient`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  patient: string;
}
export default UpdateVisitDto;
