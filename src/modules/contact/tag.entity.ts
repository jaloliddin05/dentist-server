import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Article } from '../article/article.entity';

@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @ManyToMany(() => Article, (article) => article.tags, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  articles: Article[];
}
