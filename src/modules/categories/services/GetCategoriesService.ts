import { inject, injectable } from 'tsyringe';
import { IGetAllCategoriesDTO } from '../dtos/IGetAllCategoriesDTO';
import { Category } from '../infra/typeorm/entities/Category';
import { ICategoryRepository } from '../repositories/ICategoryRepository';

@injectable()
export class GetCategoriesService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ name }: IGetAllCategoriesDTO): Promise<Category[]> {
    return this.categoryRepository.findAll(name);
  }
}
