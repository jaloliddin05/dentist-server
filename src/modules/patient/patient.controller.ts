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

import { CreatePatientDto, UpdatePatientDto } from './dto';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all patients' })
  @ApiOkResponse({
    description: 'The patients were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.patientService.getAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single patient by id' })
  @ApiOkResponse({
    description: 'The patient was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Patient> {
    return this.patientService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new patient' })
  @ApiCreatedResponse({
    description: 'The patient was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() positionData: CreatePatientDto): Promise<Patient> {
    return await this.patientService.create(positionData);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating patient' })
  @ApiOkResponse({
    description: 'Patient was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() positionData: UpdatePatientDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.patientService.change(positionData, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting patient' })
  @ApiOkResponse({
    description: 'Patient was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.patientService.deleteOne(id);
  }
}
