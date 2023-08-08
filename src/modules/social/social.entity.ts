import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';
import { Contact } from '../contact/contact.entity';

@Entity({ name: 'social' })
export class Social extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @OneToOne(() => FileEntity, (file) => file.social, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  avatar: FileEntity;

  @OneToMany(() => Contact, (contact) => contact.social)
  contacts: Contact[];
}
