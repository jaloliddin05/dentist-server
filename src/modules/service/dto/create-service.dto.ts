import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateServiceDto {
  @ApiProperty({
    description: `title`,
    example: 'service',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

export default CreateServiceDto;
