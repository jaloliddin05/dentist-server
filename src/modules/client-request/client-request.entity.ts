import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { GenderEnum } from '../../infra/shared/enum';
import { Service } from '../service/service.entity';

@Entity({ name: 'client_request' })
export class ClientRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  birthday: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int' })
  gender: GenderEnum;

  @Column({ type: 'timestamp' })
  date: string;

  @Column({ type: 'varchar' })
  time: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean = false;

  @OneToMany(() => Service, (service) => service)
  services: Service[];
}
