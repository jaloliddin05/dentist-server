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

import { CreateServiceDto, UpdateServiceDto } from './dto';
import { Service } from './service.entity';
import { ServiceService } from './service.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all services' })
  @ApiOkResponse({
    description: 'The services were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.serviceService.getAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single service by id' })
  @ApiOkResponse({
    description: 'The service was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Service> {
    return this.serviceService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new service' })
  @ApiCreatedResponse({
    description: 'The service was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() positionData: CreateServiceDto): Promise<Service> {
    return await this.serviceService.create(positionData);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating service' })
  @ApiOkResponse({
    description: 'Service was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() positionData: UpdateServiceDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.serviceService.change(positionData, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting service' })
  @ApiOkResponse({
    description: 'Service was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.serviceService.deleteOne(id);
  }
}
