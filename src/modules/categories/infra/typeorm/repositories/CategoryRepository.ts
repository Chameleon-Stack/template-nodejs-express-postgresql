import { Repository } from 'typeorm';
import { dataSource } from '../../../../../shared/infra/typeorm';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { Category } from '../entities/Category';

export class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Category);
  }

  async create(name: string): Promise<Category> {
    const category = this.ormRepository.create({ name });

    return this.ormRepository.save(category);
  }

  async findAll(name?: string): Promise<Category[]> {
    const query = this.ormRepository.createQueryBuilder('Category');

    if (name) {
      query.andWhere(`lower(cards.name) ilike '%${name}%'`);
    }

    return query.getMany();
  }

  async findById(id: string): Promise<Category> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  async delete(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }
}
