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

import { CreateContactDto, UpdateContactDto } from './dto';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all contacts' })
  @ApiOkResponse({
    description: 'The contacts were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.contactService.getAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single contact by id' })
  @ApiOkResponse({
    description: 'The contact was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Contact> {
    return this.contactService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new contact' })
  @ApiCreatedResponse({
    description: 'The contact was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() positionData: CreateContactDto): Promise<Contact> {
    return await this.contactService.create(positionData);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating contact' })
  @ApiOkResponse({
    description: 'Contact was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() positionData: UpdateContactDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.contactService.change(positionData, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting contact' })
  @ApiOkResponse({
    description: 'Contact was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.contactService.deleteOne(id);
  }
}
