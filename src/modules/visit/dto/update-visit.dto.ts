import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateServiceDto {
  @ApiProperty({
    description: `title`,
    example: 'service',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
}
export default UpdateServiceDto;
