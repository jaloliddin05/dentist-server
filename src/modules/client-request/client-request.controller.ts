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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateClientRequestDto } from './dto';
import { ClientRequest } from './client-request.entity';
import { ClientRequestService } from './client-request.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('CLient Request')
@Controller('client_request')
export class ClientRequestController {
  constructor(private readonly patientService: ClientRequestService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all client requests' })
  @ApiOkResponse({
    description: 'The client requests were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.patientService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single client request by id' })
  @ApiOkResponse({
    description: 'The client request was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<ClientRequest> {
    return this.patientService.getOne(id);
  }

  @Public()
  @Post('/')
  @ApiOperation({ summary: 'Method: creates new client request' })
  @ApiCreatedResponse({
    description: 'The client request was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(
    @Body() positionData: CreateClientRequestDto,
  ): Promise<ClientRequest> {
    return await this.patientService.create(positionData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting client request' })
  @ApiOkResponse({
    description: 'Client request was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.patientService.deleteOne(id);
  }
}
