import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { Category } from '../infra/typeorm/entities/Category';
import { ICategoryRepository } from '../repositories/ICategoryRepository';

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(name: string): Promise<Category> {
    if (!name) {
      throw new LibError('Name is required!');
    }

    const card = await this.categoryRepository.create(name);

    return card;
  }
}
