import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateContactDto {
  @ApiProperty({
    description: `value`,
    example: 'username',
  })
  @IsOptional()
  @IsString()
  readonly value: string;
}
export default UpdateContactDto;
