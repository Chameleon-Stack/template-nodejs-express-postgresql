import LibError from '../../../../shared/errors/LibError';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../repositories/inMemory/CategoryRepositoryInMemory';
import { CreateCategoryService } from '../../services/CreateCategoryService';

describe('Create category service', () => {
  let categoryRepositoryInMemory: ICategoryRepository;
  let createCategoryService: CreateCategoryService;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to create category', async () => {
    const name = 'Category test';

    const categoryCreated = await createCategoryService.execute(name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create category with params missing', async () => {
    await expect(createCategoryService.execute(null)).rejects.toEqual(
      new LibError('Name is required!'),
    );
  });
});
