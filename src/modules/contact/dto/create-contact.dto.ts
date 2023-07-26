import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateContactDto {
  @ApiProperty({
    description: `value`,
    example: 'username',
  })
  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @ApiProperty({
    description: `social`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly social: string;
}

export default CreateContactDto;
