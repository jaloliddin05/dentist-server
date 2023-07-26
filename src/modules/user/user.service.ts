import { NotFoundException, Injectable } from '@nestjs/common';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { hashPassword } from '../../infra/helpers';
import { UserRole } from '../../infra/shared/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly fileService: FileService,
  ) {}

  async getAll(
    options: IPaginationOptions,
    where?: FindOptionsWhere<User>,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.usersRepository, options, {
      order: {
        name: 'ASC',
      },
      relations: {
        avatar: true,
      },
    });
  }

  async getById(id: string): Promise<User> {
    const user = await this.usersRepository
      .findOne({ where: { id } })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return user;
  }

  async getOne(id: string) {
    const user = await this.usersRepository
      .findOne({
        where: { id },
        relations: {
          avatar: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return user;
  }

  async getByLogin(login: string) {
    const data = await this.usersRepository.findOne({
      where: { login },
    });

    return data;
  }

  async deleteOne(id: string) {
    await this.deleteImage(id).catch(() => {
      throw new NotFoundException('data not found');
    });

    const response = await this.usersRepository.delete(id);
    return response;
  }

  async change(
    value: UpdateUserDto,
    id: string,
    file: Express.Multer.File,
    request,
  ) {
    if (file) {
      const avatar = await this.updateImage(file, id, request);
      value.avatar = avatar;
    }
    await this.usersRepository.update({ id }, value);

    return this.getOne(id);
  }

  async changeRole(id: string, role: UserRole) {
    const response = await this.usersRepository.update({ id }, { role });
    return response;
  }

  async create(data: CreateUserDto) {
    try {
      data.password = await hashPassword(data.password);
      const user = this.usersRepository.create(data);
      return this.usersRepository.save(user);
    } catch (err) {
      if (err?.errno === 1062) {
        throw new Error('This user already exists.');
      }
      throw err;
    }
  }

  async uploadImage(file: Express.Multer.File, request) {
    const avatar = await this.fileService.uploadFile(file, request);
    return avatar;
  }

  async updateImage(file: Express.Multer.File, id: string, request) {
    const data = await this.getOne(id);
    let avatar;
    if (data?.avatar?.id) {
      avatar = await this.fileService.updateFile(data.avatar.id, file, request);
    } else {
      avatar = await this.fileService.uploadFile(file, request);
    }

    return avatar;
  }

  async deleteImage(id: string) {
    const data = await this.getOne(id);
    if (data?.avatar?.id) {
      await this.fileService.removeFile(data.avatar.id);
    }
  }
}
