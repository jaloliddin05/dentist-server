import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

class LoginDto {
  @ApiProperty({
    description: `Admin's login`,
    example: 'kaneki',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: `Admin's password`,
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginDto;
