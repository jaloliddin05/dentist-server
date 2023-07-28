import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { GenderEnum } from '../../infra/shared/enum';

@Entity({ name: 'patient' })
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  gender: GenderEnum;

  @Column()
  address: string;

  @Column()
  position: string;
}
