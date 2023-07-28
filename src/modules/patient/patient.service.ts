import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdatePatientDto, CreatePatientDto } from './dto';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async getAll() {
    return await this.patientRepository.find();
  }

  async getOne(id: string) {
    const data = await this.patientRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.patientRepository.delete(id);
    return response;
  }

  async change(value: UpdatePatientDto, id: string) {
    const response = await this.patientRepository.update({ id }, value);
    return response;
  }

  async create(value: CreatePatientDto) {
    const data = this.patientRepository.create(value);
    return await this.patientRepository.save(data);
  }
}
