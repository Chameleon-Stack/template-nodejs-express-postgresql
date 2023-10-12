import { v4 as uuidv4 } from 'uuid';
import LibError from '../../../../shared/errors/LibError';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../repositories/inMemory/CategoryRepositoryInMemory';
import { DeleteCategoryService } from '../../services/DeleteCategoryService';

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
    const categoryCreated = await categoryRepositoryInMemory.create('test');

    await deleteCategoryService.execute(categoryCreated.id);
  });

  it('should not be able to delete category missing params', async () => {
    await expect(deleteCategoryService.execute(null)).rejects.toEqual(
      new LibError('The property id is required!'),
    );
  });

  it('should not be able to delete category does not exists', async () => {
    await expect(deleteCategoryService.execute(uuidv4())).rejects.toEqual(
      new LibError('The category does not exist'),
    );
  });
});
