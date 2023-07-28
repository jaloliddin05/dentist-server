import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateVisitDto, CreateVisitDto } from './dto';
import { Visit } from './visit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { ServiceService } from '../service/service.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    private readonly userService: UserService,
    private readonly serviceService: ServiceService,
    private readonly patientService: PatientService,
  ) {}

  async getAll() {
    return await this.visitRepository.find();
  }

  async getOne(id: string) {
    const data = await this.visitRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.visitRepository.delete(id);
    return response;
  }

  async change(value: UpdateVisitDto, id: string) {
    let data = {};
    if (value.patient) {
      const patient = await this.patientService.getOne(value.patient);
      data = { ...value, patient };
    } else {
      delete value.patient;
      data = value;
    }
    const response = await this.visitRepository.update({ id }, data);
    return response;
  }

  async create(value: CreateVisitDto) {
    const patient = await this.patientService.getOne(value.patient);
    const doctor = await this.userService.getById(value.doctor);
    const services = await this.serviceService.getMoreByIds(value.services);

    const data = this.visitRepository.create({
      ...value,
      patient,
      doctor,
      services,
    });
    return await this.visitRepository.save(data);
  }
}
