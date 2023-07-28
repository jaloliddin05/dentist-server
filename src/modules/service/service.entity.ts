import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Visit } from '../visit/visit.entity';

@Entity({ name: 'service' })
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  title: string;

  @ManyToMany(() => User, (user) => user.services, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  users: User[];

  @ManyToMany(() => Visit, (visit) => visit.services, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  visits: Visit[];
}
