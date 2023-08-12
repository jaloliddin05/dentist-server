import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateClientRequestDto } from './dto';
import { ClientRequest } from './client-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceService } from '../service/service.service';

@Injectable()
export class ClientRequestService {
  constructor(
    @InjectRepository(ClientRequest)
    private readonly clientRequestRepository: Repository<ClientRequest>,
    private readonly serviceService: ServiceService,
  ) {}

  async getAll() {
    return await this.clientRequestRepository.find();
  }

  async getOne(id: string) {
    const data = await this.clientRequestRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.clientRequestRepository.delete(id);
    return response;
  }

  async create(value: CreateClientRequestDto) {
    let services = null;
    if (value.services.length) {
      services = await this.serviceService.getMoreByIds(value.services);
    }
    const data = this.clientRequestRepository.create({ ...value, services });
    return await this.clientRequestRepository.save(data);
  }
}
