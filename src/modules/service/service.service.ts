import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateServiceDto, CreateServiceDto } from './dto';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async getAll() {
    return await this.serviceRepository.find();
  }

  async getOne(id: string) {
    const data = await this.serviceRepository.findOne({
      relations: {
        users: {},
      },
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async getMoreByIds(ids: string[]) {
    const data = await this.serviceRepository
      .createQueryBuilder()
      .where('id IN(:...ids)', { ids })
      .getMany();

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.serviceRepository.delete(id);
    return response;
  }

  async change(value: UpdateServiceDto, id: string) {
    const response = await this.serviceRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateServiceDto) {
    const data = this.serviceRepository.create(value);
    return await this.serviceRepository.save(data);
  }
}
