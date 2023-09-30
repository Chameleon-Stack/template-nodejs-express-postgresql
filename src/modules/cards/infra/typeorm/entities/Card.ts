import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../../../categories/infra/typeorm/entities/Category';
import { User } from '../../../../users/infra/typeorm/entities/User';

@Entity('Cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
