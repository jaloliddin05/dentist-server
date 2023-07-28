import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../infra/shared/enum';
class UpdatePatientDto {
  @ApiProperty({
    description: `name`,
    example: 'John Doe Mark',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `birthday`,
    example: '10-05-2000',
  })
  @IsOptional()
  @IsString()
  birthday: string;

  @ApiProperty({
    description: `phone`,
    example: '+998998887766',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    description: `position`,
    example: 'student',
  })
  @IsOptional()
  @IsString()
  position: string;

  @ApiProperty({
    description: `gender`,
    example: GenderEnum.MALE,
  })
  @IsOptional()
  @IsString()
  gender: GenderEnum;

  @ApiProperty({
    description: `address`,
    example: 'tashkent, uol street',
  })
  @IsOptional()
  @IsString()
  address: string;
}
export default UpdatePatientDto;
