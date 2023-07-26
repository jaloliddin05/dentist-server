import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity({ name: 'file' })
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  path: string;

  @OneToOne(() => User, (user) => user.avatar, {
    onDelete: 'CASCADE',
  })
  user: User;
}
