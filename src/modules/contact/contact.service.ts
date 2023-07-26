import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateContactDto, CreateContactDto } from './dto';
import { Contact } from './contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialService } from '../social/social.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly socialService: SocialService,
  ) {}

  async getAll() {
    const data = await this.contactRepository.find();
    return data;
  }

  async getOne(id: string) {
    const data = await this.contactRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.contactRepository.delete(id);
    return response;
  }

  async change(value: UpdateContactDto, id: string) {
    const response = await this.contactRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateContactDto) {
    const social = await this.socialService.getOne(value.social);
    const data = this.contactRepository.create({ ...value, social });
    return await this.contactRepository.save(data);
  }
}
