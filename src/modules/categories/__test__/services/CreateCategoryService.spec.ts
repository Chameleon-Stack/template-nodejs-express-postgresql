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

    const userCreated = await createCategoryService.execute(name);

    expect(userCreated).toHaveProperty('id');
  });

  it('should be able to create category with params missing', async () => {
    await expect(createCategoryService.execute(null)).rejects.toEqual(
      new Error('Name is required!'),
    );
  });
});
