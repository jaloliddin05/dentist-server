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

import { CreateVisitDto, UpdateVisitDto } from './dto';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Visit')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all visits' })
  @ApiOkResponse({
    description: 'The visits were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.visitService.getAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single visit by id' })
  @ApiOkResponse({
    description: 'The visit was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Visit> {
    return this.visitService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new visit' })
  @ApiCreatedResponse({
    description: 'The visit was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() positionData: CreateVisitDto): Promise<Visit> {
    return await this.visitService.create(positionData);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating visit' })
  @ApiOkResponse({
    description: 'Visit was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() positionData: UpdateVisitDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.visitService.change(positionData, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting visit' })
  @ApiOkResponse({
    description: 'Visit was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.visitService.deleteOne(id);
  }
}
