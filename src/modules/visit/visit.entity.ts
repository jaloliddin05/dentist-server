import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Service } from '../service/service.entity';
import { Patient } from '../patient/patient.entity';

@Entity({ name: 'visit' })
export class Visit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: true })
  date: Date | string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Patient, (patient) => patient.visits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  patient: Patient;

  @ManyToMany(() => Service, (service) => service.visits, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  services: Service[];

  @ManyToOne(() => User, (user) => user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  doctor: User;
}
