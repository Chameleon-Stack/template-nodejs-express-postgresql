import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../repositories/inMemory/CategoryRepositoryInMemory';
import { GetCategoriesService } from '../../services/GetCategoriesService';

describe('Get all categories service', () => {
  let categoryRepositoryInMemory: ICategoryRepository;
  let getCategoriesService: GetCategoriesService;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    getCategoriesService = new GetCategoriesService(categoryRepositoryInMemory);
  });

  it('should be able to get categories by filter', async () => {
    const categoryCreated = await categoryRepositoryInMemory.create('test');

    const findCategory = await getCategoriesService.execute({
      name: categoryCreated.name,
    });

    expect(findCategory[0].id).toEqual(categoryCreated.id);
    expect(findCategory[0].name).toEqual(categoryCreated.name);
  });

  it('should be able to get all categories', async () => {
    const categoryCreated = await categoryRepositoryInMemory.create('test 1');

    const findCategory = await getCategoriesService.execute({
      name: null,
    });

    expect(findCategory[0].id).toEqual(categoryCreated.id);
    expect(findCategory[0].name).toEqual(categoryCreated.name);
  });
});
