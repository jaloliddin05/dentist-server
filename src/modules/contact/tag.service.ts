import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTagDto, CreateTagDto } from './dto';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getAll() {
    const data = await this.tagRepository.find();
    return data;
  }

  async getOne(id: string) {
    const data = await this.tagRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async getMoreByIds(ids: string[]) {
    const data = await this.tagRepository
      .createQueryBuilder()
      .where('id IN(:...ids)', { ids })
      .getMany();
    return data;
  }

  async deleteOne(id: string) {
    const response = await this.tagRepository.delete(id);
    return response;
  }

  async change(value: UpdateTagDto, id: string) {
    const response = await this.tagRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateTagDto) {
    const data = this.tagRepository.create(value);
    return await this.tagRepository.save(data);
  }
}
