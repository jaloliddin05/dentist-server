import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../infra/shared/enum';
class CreatePatientDto {
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
    description: `position`,
    example: 'student',
  })
  @IsNotEmpty()
  @IsString()
  position: string;

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
}

export default CreatePatientDto;
