import { v4 as uuidv4 } from 'uuid';
import { ICategoryRepository } from '../../src/modules/categories/repositories/ICategoryRepository';
import { DeleteCategoryService } from '../../src/modules/categories/services/DeleteCategoryService';
import { CategoryRepositoryInMemory } from '../../src/modules/categories/repositories/inMemory/CategoryRepositoryInMemory';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import LibraryError from '../../src/shared/errors/LibError';

describe('Delete category service', () => {
  let categoryRepositoryInMemory: ICategoryRepository;
  let deleteCategoryService: DeleteCategoryService;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    deleteCategoryService = new DeleteCategoryService(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to delete category', async () => {
    const categoryCreated = await categoryRepositoryInMemory.create(
      'test',
      new User(),
    );

    await deleteCategoryService.execute(categoryCreated.id);
  });

  it('should not be able to delete category does not exists', async () => {
    await expect(deleteCategoryService.execute(uuidv4())).rejects.toEqual(
      new LibraryError('The category does not exist', 404),
    );
  });
});
