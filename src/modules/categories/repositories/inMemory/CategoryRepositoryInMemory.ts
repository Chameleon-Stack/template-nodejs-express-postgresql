import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoryRepository } from '../ICategoryRepository';

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async create(name: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: uuidv4(),
      name,
    });

    this.categories.push(category);

    return category;
  }

  async findAll(name?: string): Promise<Category[]> {
    return name
      ? this.categories.filter(category => category.name.includes(name))
      : this.categories;
  }

  async findById(id: string): Promise<Category> {
    return this.categories.find(category => category.id === id);
  }

  async delete(user: Category): Promise<void> {
    this.categories.splice(this.categories.indexOf(user));
  }
}
