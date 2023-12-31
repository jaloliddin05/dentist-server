import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { GenderEnum } from '../../infra/shared/enum';
import { Visit } from '../visit/visit.entity';

@Entity({ name: 'patient' })
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  birthday: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'int' })
  gender: GenderEnum;

  @Column()
  address: string;

  @Column()
  position: string;

  @OneToMany(() => Visit, (visit) => visit.patient)
  visits: Visit[];
}
