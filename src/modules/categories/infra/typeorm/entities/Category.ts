import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from '../../../../cards/infra/typeorm/entities/Card';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @ManyToMany(() => Card)
  @JoinTable()
  cards: Card[];
}
