import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserRole } from '../../infra/shared/types';
import { FileEntity } from '../file/file.entity';
import { Service } from '../service/service.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true })
  login: string;

  @Column({ default: 1 })
  role: UserRole;

  @Column({ type: 'timestamp', nullable: false, default: () => 'NOW()' })
  createdAt: string;

  @OneToOne(() => FileEntity, (file) => file.user, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  avatar: FileEntity;

  @ManyToMany(() => Service, (service) => service.users, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  services: Service[];

  public async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  public isPasswordValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
