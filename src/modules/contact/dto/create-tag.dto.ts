import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateTagDto {
  @ApiProperty({
    description: `title`,
    example: '#ru',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

export default CreateTagDto;
