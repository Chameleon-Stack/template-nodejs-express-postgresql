import { Category } from '../infra/typeorm/entities/Category';

export interface ICategoryRepository {
  create(name: string): Promise<Category>;
  findAll(name?: string): Promise<Category[]>;
  findById(id: string): Promise<Category>;
  delete(category: Category): Promise<void>;
}
