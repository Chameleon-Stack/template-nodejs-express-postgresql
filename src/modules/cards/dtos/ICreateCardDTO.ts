import { Category } from '../../categories/infra/typeorm/entities/Category';
import { User } from '../../users/infra/typeorm/entities/User';

export interface ICreateCardDTO {
  status: string;
  title: string;
  description: string;
  user: User;
  categories?: Category[];
}
