import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../repositories/ICategoryRepository';

@injectable()
export class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('The property id is required!');
    }

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error('The category does not exist');
    }

    await this.categoryRepository.delete(category);
  }
}
