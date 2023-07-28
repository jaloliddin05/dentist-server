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
import { GenderEnum } from '../../infra/shared/enum';

@Entity({ name: 'visit' })
export class Visit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  gender: GenderEnum;

  @Column()
  address: string;

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
