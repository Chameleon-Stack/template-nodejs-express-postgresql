import { ICategoryRepository } from '../../src/modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../src/modules/categories/repositories/inMemory/CategoryRepositoryInMemory';
import { GetCategoriesService } from '../../src/modules/categories/services/GetCategoriesService';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';

describe('Get all categories service', () => {
  let categoryRepositoryInMemory: ICategoryRepository;
  let getCategoriesService: GetCategoriesService;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    getCategoriesService = new GetCategoriesService(categoryRepositoryInMemory);
  });

  it('should be able to get categories by filter', async () => {
    const categoryCreated = await categoryRepositoryInMemory.create(
      'test',
      new User(),
    );

    const findCategory = await getCategoriesService.execute({
      name: categoryCreated.name,
      user_id: categoryCreated.user_id,
    });

    expect(findCategory[0].id).toEqual(categoryCreated.id);
    expect(findCategory[0].name).toEqual(categoryCreated.name);
  });

  it('should be able to get all categories', async () => {
    const categoryCreated = await categoryRepositoryInMemory.create(
      'test 1',
      new User(),
    );

    const findCategory = await getCategoriesService.execute({
      name: undefined,
      user_id: categoryCreated.user_id,
    });

    expect(findCategory[0].id).toEqual(categoryCreated.id);
    expect(findCategory[0].name).toEqual(categoryCreated.name);
  });
});
