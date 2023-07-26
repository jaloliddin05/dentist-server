import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateSocialDto, UpdateSocialDto } from './dto';
import { Social } from './social.entity';
import { SocialService } from './social.service';
import { Public } from '../auth/decorators/public.decorator';
import { UserRoleEnum } from '../../infra/shared/enum';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Social')
@Controller('social')
export class SocialController {
  constructor(private readonly positionService: SocialService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all social' })
  @ApiOkResponse({
    description: 'The socials were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.positionService.getAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single social by id' })
  @ApiOkResponse({
    description: 'The social was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Social> {
    return this.positionService.getOne(id);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Post('/')
  @ApiOperation({ summary: 'Method: creates new social' })
  @ApiCreatedResponse({
    description: 'The social was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() positionData: CreateSocialDto): Promise<Social> {
    return await this.positionService.create(positionData);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating tag' })
  @ApiOkResponse({
    description: 'Social was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() positionData: UpdateSocialDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.positionService.change(positionData, id);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting social' })
  @ApiOkResponse({
    description: 'Social was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.positionService.deleteOne(id);
  }
}
