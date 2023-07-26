import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateTagDto {
  @ApiProperty({
    description: `title`,
    example: '#uz',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
}
export default UpdateTagDto;
