import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateSocialDto, CreateSocialDto } from './dto';
import { Social } from './social.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>,
  ) {}

  async getAll() {
    const data = await this.socialRepository.find();
    return data;
  }

  async getOne(id: string) {
    const data = await this.socialRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.socialRepository.delete(id);
    return response;
  }

  async change(value: UpdateSocialDto, id: string) {
    const response = await this.socialRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateSocialDto) {
    const data = this.socialRepository.create(value);
    return await this.socialRepository.save(data);
  }
}
